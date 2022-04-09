import { CardsViewTypes } from "fanartweb-shared"
import Router from "koa-router"
import { IDBAppState, IDBAppContext } from "../model"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.all('/fanartList', async (ctx, next) => {
    if (ctx.request.query.type != undefined && typeof ctx.request.query.type != 'string') {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: `参数错误`,
            data: {}
        }
        return
    }
    const privilegedTypes = [CardsViewTypes.ALL.value]
    if (privilegedTypes.includes(ctx.request.query.type)) {
        if (!await ctx.mongo.verifyToken(ctx.request.header.authorization?.replace('Bearer ', ''))) {
            ctx.response.status = 401
            ctx.response.body = {
                code: 1,
                msg: 'token验证失败',
                data: {}
            }
            return
        }
    }
    await next()
})

router.get('/fanartList', async (ctx, next) => {
    let page
    if (!ctx.request.query.page || isNaN(Number(ctx.request.query.page))) {
        page = 1
    } else {
        page = Number(ctx.request.query.page)
    }
    if (ctx.request.query.type == CardsViewTypes.ALL.value) {
        ctx.response.status = 200
        ctx.response.body = await ctx.mongo.getAllCards(page)
    } else {
        ctx.response.status = 200
        ctx.response.body = await ctx.mongo.getCards(page)
    }
    await next()
});