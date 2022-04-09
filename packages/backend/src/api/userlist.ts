import Router from "koa-router"
import { IDBAppState, IDBAppContext } from "../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.all('/userlist', async (ctx, next) => {
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

router.get('/userlist', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        code: 1,
        msg: 'ok',
        data: await ctx.mongo.getUserList()
    }
    await next()
});