import Router from "koa-router"
import { IDBAppState, IDBAppContext } from "../model"
import { GlobalConfig } from "fanartweb-shared"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.all('/config/:foo*', async (ctx, next) => {
    if (!await ctx.mongo.verifyToken(ctx.request.header.authorization?.replace('Bearer ', ''))) {
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

router.get('/config/global', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: await ctx.mongo.getGlobalConfig()
    }
    await next()
})

router.put('/config/global', async (ctx, next) => {
    if (!ctx.request.body.new_card_time || !Number(ctx.request.body.new_card_time)) {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: `参数错误`,
            data: {}
        }
        return
    }
    const data: GlobalConfig = {
        type: 'global',
        new_card_time: Number(ctx.request.body.new_card_time)
    }
    await ctx.mongo.setGlobalConfig(data)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: {}
    }
    await next()
})