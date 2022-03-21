import { Collection, MongoClient } from "mongodb"
import logger from "./logger"
// import { onMblogEvent } from "./weibo.ts"
import { Card, MongoDBs } from "./model"

export {
    MongoController
}

class MongoController {
    client: MongoClient
    dbs: MongoDBs

    constructor(client: MongoClient, dbs: MongoDBs) {
        this.client = client
        this.dbs = dbs
    }
    static async getInstance() {
        const client = new MongoClient(
            process.env.NODE_ENV == 'development'
                ? 'mongodb://admin:admin@localhost:27017/'
                : 'mongodb://admin:' +
                process.env.MONGODB_PASS +
                '@' +
                process.env.MONGODB_IP +
                ':27017/?authMechanism=DEFAULT'
        )
        let dbs
        try {
            await client.connect()
            dbs = {
                cardlist: client.db('fanart').collection('cardlist'),
                config: client.db('fanart').collection('config'),
                blacklist: client.db('fanart').collection('blacklist'),
                whitelist: client.db('fanart').collection('whitelist')
            } as MongoDBs
            dbs.cardlist.createIndex({ id: -1 }, { unique: true })
            dbs.cardlist.createIndex({ timestamp: -1 })
        } catch (err) {
            console.log('ERR when connect to AMDB')
            console.log(err)
            process.exit(1)
        }
        logger.info('数据库已连接')
        return new MongoController(client, dbs)
    }
    async close() {
        await this.client.close()
    }
    async insertCards(cards: Card[]) {
        logger.info(`cardlist更新${cards.length}条数据`)
        await Promise.all(cards.map(card => this.dbs.cardlist.updateOne({ id: card.id }, {
            $set: card,
            // $setOnInsert: { _id: card.id }
        }, { upsert: true })))
        logger.info('cardlist更新完毕')
    }
    async getCards(pages: number) {
        return await this.dbs.cardlist.find({ 'user.id': { $nin: await this.getBlackList() } }).sort('timestamp', -1).skip((pages - 1) * 20).limit(20).toArray()
    }
    async isCardsExist() {
        return await this.client.db('fanart').listCollections({ name: 'cardlist' }).hasNext() && await this.dbs.cardlist.countDocuments() > 0
    }
    async getGlobalConfig() {
        return await this.dbs.config.findOne({ type: 'global' })
    }
    async getBlackListRaw() {
        return await this.dbs.blacklist.find().toArray()
    }
    async getBlackList() {
        return (await this.getBlackListRaw()).map(user => user.id)
    }
    async getWhiteListRaw() {
        return await this.dbs.whitelist.find().toArray()
    }
}