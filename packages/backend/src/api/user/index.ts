import Router from "koa-router"
import { IDBAppContext, IDBAppState } from "../../model"

import listRoutes from "./list"
import blacklistRoutes from "./blacklist"
import whitelistRoutes from "./whitelist"

const router = new Router<IDBAppState, IDBAppContext>()
export default router

router.use('/user', listRoutes.routes())
router.use('/user', blacklistRoutes.routes())
router.use('/user', whitelistRoutes.routes())