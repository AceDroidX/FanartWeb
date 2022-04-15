import { UserInList } from "fanartweb-shared"
import Router from "koa-router"
import { IDBAppContext, IDBAppState } from "../../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.all('/whitelist', async (ctx, next) => {
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

router.get('/whitelist', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: await ctx.mongo.getUserListRaw('whitelist')
    }
    await next()
})

router.post('/whitelist', async (ctx, next) => {
    await ctx.mongo.addUserList('whitelist', ctx.request.body as UserInList)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '添加成功',
        data: await ctx.mongo.getUserListRaw('whitelist')
    }
    await next()
})

router.delete('/whitelist', async (ctx, next) => {
    if (!ctx.request.query.id || !Number(ctx.request.query.id)) {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: 'id不合法',
            data: {}
        }
        return
    }
    await ctx.mongo.deleteUserList('whitelist', Number(ctx.request.query.id))
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '删除成功',
        data: await ctx.mongo.getUserListRaw('whitelist')
    }
    await next()
})

router.put('/whitelist', async (ctx, next) => {
    await ctx.mongo.updateUserList('whitelist', ctx.request.body as UserInList)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: '更新成功',
        data: await ctx.mongo.getUserListRaw('whitelist')
    }
    await next()
})
