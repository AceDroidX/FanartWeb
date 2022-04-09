import { UserInList } from "fanartweb-shared"
import Router from "koa-router"
import { IDBAppContext, IDBAppState } from "../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

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
