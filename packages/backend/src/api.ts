import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from './logger';
import { IDBAppState, IDBAppContext } from './model';
import { MongoController } from './MongoController';
import { createHash, randomBytes } from 'crypto';
import { AdminUser, Token, UserInList } from 'fanartweb-shared';

export const router = new Router<IDBAppState, IDBAppContext>()

router.get('/test', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'ok'
    await next()
});

router.get('/fanartList', async (ctx, next) => {
    ctx.response.status = 200
    let page
    if (!ctx.request.query.page || isNaN(Number(ctx.request.query.page))) {
        page = 1
    } else {
        page = Number(ctx.request.query.page)
    }
    ctx.response.body = await ctx.mongo.getCards(page)
    await next()
});

router.post('/user/login', async (ctx, next) => {
    if (await ctx.mongo.verifyAdminUser(ctx.request.body.username, ctx.request.body.password)) {
        const token = randomBytes(32).toString('hex')
        ctx.mongo.insertToken({
            username: ctx.request.body.username,
            token: token,
            ts: Date.now(),
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
        } as Token)
        ctx.response.status = 200
        ctx.response.body = {
            code: 0,
            msg: '登录成功',
            data: {
                token: token,
            }
        }
    } else {
        ctx.response.status = 401
        ctx.response.body = {
            code: 1,
            msg: '登录失败',
            data: {}
        }
        return
    }
    await next()
})

router.post('/user/register', async (ctx, next) => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    let salt = ctx.request.body.salt
    if (!salt) {
        salt = randomBytes(32).toString('hex')
    }
    logger.debug(`username: ${username}, password: ${password}, salt: ${salt}`)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '请手动将data添加至admin数据库',
        data: {
            type: 'admin',
            username,
            password: createHash('sha256').update(salt + password).digest('hex'),
            salt
        } as AdminUser
    }
    await next()
})

router.all('/blacklist', async (ctx, next) => {
    if (!await ctx.mongo.verifyToken(ctx.request.query.token)) {
        ctx.response.status = 401
        ctx.response.body = {
            code: 1,
            msg: 'token验证失败',
            data: {}
        }
        return
    }
    await next()
})

router.get('/blacklist', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: await ctx.mongo.getBlackListRaw()
    }
    await next()
})

router.post('/blacklist', async (ctx, next) => {
    await ctx.mongo.addBlackList(ctx.request.body as UserInList)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '添加成功',
        data: await ctx.mongo.getBlackListRaw()
    }
    await next()
})

router.delete('/blacklist', async (ctx, next) => {
    if (!ctx.request.query.id || !Number(ctx.request.query.id)) {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: 'id不合法',
            data: {}
        }
        return
    }
    await ctx.mongo.deleteBlackList(Number(ctx.request.query.id))
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '删除成功',
        data: await ctx.mongo.getBlackListRaw()
    }
    await next()
})

router.put('/blacklist', async (ctx, next) => {
    await ctx.mongo.updateBlackList(ctx.request.body as UserInList)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '更新成功',
        data: await ctx.mongo.getBlackListRaw()
    }
    await next()
})

export async function initApi(mongo: MongoController) {
    const app = new Koa<IDBAppState, IDBAppContext>();
    app.use(bodyParser())
    app.use(
        cors({
            origin: (ctx) => '*',
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        })
    )
    app.context.mongo = mongo
    app.use(router.routes())
    app.listen(2162)
    logger.info('API服务器已启动:2162')
}
