import { AsyncTask, SimpleIntervalJob, Task, ToadScheduler } from "toad-scheduler"
import { checkCookie, getAllTag, getNewTag } from "./bili"
import logger from "./logger"
import { Card } from "./model"
import { MongoController } from "./mongo/MongoController"
import { logErrorDetail } from "./utils"

export class BiliController {
    tag = { id: 12454097, name: '鲨画' }

    mongo: MongoController
    scheduler: ToadScheduler
    task: AsyncTask
    job: SimpleIntervalJob
    constructor(mongo: MongoController) {
        this.mongo = mongo
        this.scheduler = new ToadScheduler()
        this.task = new AsyncTask('RefreshTask', () => { return this.intervaljob() }, (err: Error) => { logErrorDetail('RefreshTask错误', err) })
        this.job = new SimpleIntervalJob({ seconds: 60, }, this.task)
    }
    async runIntervalJob() {
        if (!await checkCookie()) {
            throw new Error('bilibili cookie过期')
        }
        if (!await this.mongo.isCardsExist()) {
            logger.info('数据为空，开始获取全部卡片')
            await this.insertCards(await this.getAllTag())
        }
        logger.info('启动卡片获取定时任务')
        await this.intervaljob()
        this.scheduler.addSimpleIntervalJob(this.job)
    }
    stopIntervalJob() {
        this.scheduler.stop()
    }
    async intervaljob() {
        logger.debug('开始获取新卡片')
        if (!await checkCookie()) {
            throw new Error('bilibili cookie过期')
        }
        this.insertCards(await getNewTag(this.tag))
    }
    async getAllTag() {
        const cards = await getAllTag(this.tag)
        if (cards == undefined) {
            throw new Error('获取卡片失败')
        }
        return cards
    }
    async insertCards(cards: Card[]) {
        await this.mongo.insertCards(cards)
    }
}