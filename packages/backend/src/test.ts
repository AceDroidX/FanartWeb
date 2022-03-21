process.env.NODE_ENV = 'development'
process.env.BILI_COOKIE = ""

import { checkCookie, getAllTag, getNewTag } from "./bili"
import { MongoController } from "./MongoController"
import fs from 'fs';
import path from 'path';
import { Card, IDBAppContext, IDBAppState } from "./model";
import { main } from './index'

test()

async function test() {
    // console.log(await getOldPics())
    // await saveCardsToMongo(await saveCardsToFile())
    // await saveCardsToMongo(readCardsFromFile())
    // await initApi()
    // const cards = readCardsFromFile()
    // await saveCardsToMongo(cards)
    await main()
}

async function saveCardsToFile() {
    const filepath = path.resolve(__dirname, '..') + '/log/cards.json'
    const tag = { id: 12454097, name: '鲨画' }
    const cards = await getAllTag(tag)
    console.log(cards)
    if (cards == undefined) {
        throw new Error('获取卡片失败')
    }
    fs.writeFileSync(filepath, JSON.stringify(cards))
    return cards
}

function readCardsFromFile() {
    const filepath = path.resolve(__dirname, '..') + '/log/cards.json'
    const cards: Card[] = JSON.parse(fs.readFileSync(filepath).toString()).map((card: any) => card as Card)
    return cards
}

async function saveCardsToMongo(cards: Card[]) {
    const mongo = await MongoController.getInstance()
    await mongo.insertCards(cards)
    // cards.forEach((card: { emoji: any }) => {
    //     console.log(card.emoji)
    // })
}

async function isCardsExist() {
    const mongo = await MongoController.getInstance()
    return mongo.isCardsExist()
}

async function getOldPics() {
    const mongo = await MongoController.getInstance()
    return await mongo.getCards(1)
}

async function saveNewCards() {
    const tag = { id: 12454097, name: '鲨画' }
    const cards = await getNewTag(tag)
    const mongo = await MongoController.getInstance()
    mongo.insertCards(cards)
}