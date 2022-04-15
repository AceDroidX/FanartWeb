import Router from "koa-router"
import { IDBAppContext, IDBAppState } from "../../model"

import listRoutes from "./list"
import blacklistRoutes from "./blacklist"
import whitelistRoutes from "./whitelist"
import { UserInList } from "fanartweb-shared"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.put("/user", async (ctx, next) => {
    if (ctx.request.query.type != undefined && typeof ctx.request.query.type != 'string') {
        ctx.response.status = 400
        ctx.response.body = {
            code: 1,
            msg: `参数错误`,
            data: {}
        }
        return
    }
    if (!await ctx.mongo.verifyToken(ctx.request.header.authorization?.replace('Bearer ', ''))) {
        ctx.response.status = 401
        ctx.response.body = {
            code: 1,
            msg: 'token验证失败',
            data: {}
        }
        return
    }
    const user: UserInList = ctx.request.body
    ctx.response.status = 200
    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: await ctx.mongo.setUserInfo(user, ctx.request.query.type)
    }
    await next()
})

router.use('/user', listRoutes.routes())
router.use('/user', blacklistRoutes.routes())
router.use('/user', whitelistRoutes.routes())