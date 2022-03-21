import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from './logger';
import { IDBAppState, IDBAppContext } from './model';
import { MongoController } from './MongoController';

export const router = new Router<IDBAppState, IDBAppContext>()

router.get('/test', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'ok'
    await next()
});

router.get('/fanartList', async (ctx, next) => {
    ctx.response.status = 200
    let page
    if (!ctx.request.query.page || isNaN(Number(ctx.request.query.page))) {
        page = 1
    } else {
        page = Number(ctx.request.query.page)
    }
    ctx.response.body = await ctx.mongo.getCards(page)
    await next()
});

export async function initApi(mongo: MongoController) {
    const app = new Koa<IDBAppState, IDBAppContext>();
    app.use(bodyParser())
    app.use(
        cors({
            origin: (ctx) => '*',
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        })
    )
    app.context.mongo = mongo
    app.use(router.routes())
    app.listen(2162)
    logger.info('API服务器已启动:2162')
}
