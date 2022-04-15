import Router from "koa-router"
import { Long } from "mongodb"
import { IDBAppState, IDBAppContext } from "../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.all('/fanart/:foo*', async (ctx, next) => {
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

router.put('/fanart/checked', async (ctx, next) => {
    if (typeof ctx.request.body.id != 'string') {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: `参数错误`,
            data: {}
        }
        return
    }
    let id = new Long(ctx.request.body.id)
    if (id.equals(new Long(0))) {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: `参数错误: id只能为数字`,
            data: {}
        }
        return
    }
    await ctx.mongo.setCardChecked(id, ctx.request.body.checked)
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: {}
    }
    await next()
});