import { AdminUser, GlobalConfig, MongoDoc, Token, UserInList } from "fanartweb-shared"
import { Int32, MongoClient } from "mongodb"
import logger from "./logger"
// import { onMblogEvent } from "./weibo.ts"
import { Card, MongoDBs } from "./model"
import { createHash } from 'crypto'

export {
    MongoController
}

const getCardsPipeline = (blacklist: number[], ckecked: boolean | undefined, newCardTime: number, skipNum: number, limitNum: number) => [{
    $sort: {
        timestamp: -1
    }
}, {
    $match: {
        $or: [
            {
                'user.id': {
                    $nin: blacklist
                },
                'ckecked': ckecked !== undefined ? ckecked : { $in: [true, false, undefined] },
                'timestamp': { $gte: newCardTime }
            },
            {
                'user.id': {
                    $nin: blacklist
                },
                'timestamp': { $lt: newCardTime }
            }
        ]
    }
}, {
    $skip: skipNum
}, {
    $limit: limitNum
}, {
    $set: {
        id: {
            $toString: '$id'
        }
    }
}]

class MongoController {
    client: MongoClient
    dbs: MongoDBs

    constructor(client: MongoClient, dbs: MongoDBs) {
        this.client = client
        this.dbs = dbs
    }
    static async getInstance() {
        const client = new MongoClient(
            process.env.NODE_ENV == 'production'
                ? `mongodb://admin:${process.env.MONGODB_PASS}@${process.env.MONGODB_IP}:27017/?authMechanism=DEFAULT`
                : 'mongodb://admin:admin@localhost:27017/'
        )
        let dbs
        try {
            await client.connect()
            dbs = {
                cardlist: client.db('fanart').collection('cardlist'),
                config: client.db('fanart').collection('config'),
                blacklist: client.db('fanart').collection('blacklist'),
                whitelist: client.db('fanart').collection('whitelist'),
                admin: client.db('fanart').collection('admin'),
                token: client.db('fanart').collection('token'),
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
        const result = await Promise.all([this.getBlackList(), this.getGlobalConfig()])
        return await this.dbs.cardlist.aggregate(getCardsPipeline(result[0], true, result[1].new_card_time, (pages - 1) * 20, 20)).toArray()
    }
    async getAllCards(pages: number) {
        return await this.dbs.cardlist.aggregate(getCardsPipeline([], undefined, (await this.getGlobalConfig()).new_card_time, (pages - 1) * 20, 20)).toArray()
    }
    async isCardsExist() {
        return await this.client.db('fanart').listCollections({ name: 'cardlist' }).hasNext() && await this.dbs.cardlist.countDocuments() > 0
    }
    async verifyAdminUser(username: string, password: string) {
        const admin_user = (await this.dbs.admin.findOne({ username })) as MongoDoc<AdminUser>
        if (!admin_user) return false
        return createHash('sha256').update(admin_user.salt + password).digest('hex') == admin_user.password
    }
    async initGlobalConfig() {
        const config: GlobalConfig = {
            type: 'global',
            new_card_time: 2147483647,
        }
        await this.dbs.config.insertOne(config)
        return config
    }
    async getGlobalConfig() {
        const config = await this.dbs.config.findOne({ type: 'global' })
        return config ? config : await this.initGlobalConfig()
    }
    async setGlobalConfig(value: GlobalConfig) {
        await this.dbs.config.updateOne({ type: 'global' }, value, { upsert: true })
    }
    async getBlackListRaw() {
        return await this.dbs.blacklist.find().toArray()
    }
    async getBlackList() {
        return (await this.getBlackListRaw()).map(user => user.id)
    }
    async addBlackList(user: UserInList) {
        await this.dbs.blacklist.insertOne(user)
    }
    async deleteBlackList(id: number) {
        await this.dbs.blacklist.deleteOne({ id })
    }
    async updateBlackList(user: UserInList) {
        await this.dbs.blacklist.updateOne({ id: user.id }, { $set: user })
    }
    async getWhiteListRaw() {
        return await this.dbs.whitelist.find().toArray()
    }
    async getWhiteList() {
        return (await this.getWhiteListRaw()).map(user => user.id)
    }
    async getUserList() {
        const result = await Promise.all([this.getBlackList(), this.getWhiteList()])
        return { blacklist: result[0], whitelist: result[1] }
    }
    async getUserListRaw() {
        const result = await Promise.all([this.getBlackListRaw(), this.getWhiteListRaw()])
        return { blacklist: result[0], whitelist: result[1] }
    }
    async insertToken(token: Token) {
        await this.dbs.token.insertOne(token)
    }
    async verifyToken(tokenstr: string | string[] | undefined) {
        if (!tokenstr) return false
        const token = (await this.dbs.token.findOne({ token: tokenstr })) as MongoDoc<Token>
        return token && token.exp > Date.now()
    }
}