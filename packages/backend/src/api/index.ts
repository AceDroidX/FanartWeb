import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from '../logger';
import { IDBAppState, IDBAppContext } from '../model';
import { MongoController } from '../MongoController';

import fanartRoutes from './fanart';
import fanartListRoutes from './fanartList';
import userRoutes from './user';
import userlistRoutes from './userlist';
import blacklistRoutes from './blacklist';
import configRoutes from './config';

const router = new Router<IDBAppState, IDBAppContext>()

router.get('/test', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'ok'
    await next()
});

router.use(fanartRoutes.routes());
router.use(fanartListRoutes.routes());
router.use(userRoutes.routes());
router.use(userlistRoutes.routes());
router.use(blacklistRoutes.routes())
router.use(configRoutes.routes())

export async function initApi(mongo: MongoController) {
    const app = new Koa<IDBAppState, IDBAppContext>();
    app.use(bodyParser())
    app.use(
        cors({
            origin: (ctx) => '*',
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        })
    )
    app.context.mongo = mongo
    app.use(router.routes())
    app.listen(2162)
    logger.info('API服务器已启动:2162')
}
