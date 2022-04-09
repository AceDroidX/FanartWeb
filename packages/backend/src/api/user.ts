import { Token, AdminUser } from "fanartweb-shared"
import Router from "koa-router"
import logger from "../logger"
import { createHash, randomBytes } from 'crypto';
import { IDBAppState, IDBAppContext } from "../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

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