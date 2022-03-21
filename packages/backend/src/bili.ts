import axios from "axios"
import { Tag } from "fanartweb-shared"
import logger from "./logger"
import { Card } from "./model"

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36'
const cookie = process.env.BILI_COOKIE ? process.env.BILI_COOKIE : ''

export async function getNewTag(tag: Tag) {
    const resp: {
        cards: Card[];
        offset: any;
        has_more: any;
    } | undefined = await fetchBiliTag(tag)
    if (resp == undefined) {
        throw new Error("resp is undefined")
    }
    return resp.cards
}

export async function getAllTag(tag: Tag) {
    let cards: Card[] = []
    let offset_dynamic_id = undefined
    let has_more = 1
    while (has_more) {
        const resp: {
            cards: Card[];
            offset: any;
            has_more: any;
        } | undefined = await fetchBiliTag(tag, offset_dynamic_id)
        if (resp == undefined) {
            throw new Error("resp is undefined")
        }
        cards = cards.concat(resp.cards)
        offset_dynamic_id = Number(resp.offset)
        has_more = resp.has_more
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    return cards
}

async function fetchBiliTag(tag: Tag, offset_dynamic_id?: number) {
    let resp
    if (offset_dynamic_id == undefined) {
        resp = await axios.get(`https://api.vc.bilibili.com/topic_svr/v1/topic_svr/topic_new?topic_id=${tag.id}`, { headers: { 'User-Agent': UA, 'cookie': cookie } })
    } else {
        resp = await axios.get(encodeURI(`https://api.vc.bilibili.com/topic_svr/v1/topic_svr/topic_history?topic_name=${tag.name}&offset_dynamic_id=${offset_dynamic_id}`), { headers: { 'User-Agent': UA, 'cookie': cookie } })
    }
    if (resp.status != 200 || resp.data?.code != 0) {
        logger.error(`获取BiliTag失败:${JSON.stringify(resp.data)}`)
        return
    }
    const cards: Card[] = []
    for (const rawcard of resp.data.data.cards) {
        const card = Card.getFromRaw(rawcard)
        if (card) {
            cards.push(card)
        }
    }
    return { cards: cards, offset: resp.data.data.offset, has_more: resp.data.data.has_more }
}

export async function checkCookie() {
    const resp = await axios.get('https://api.bilibili.com/x/web-interface/nav', { headers: { 'User-Agent': UA, 'cookie': cookie } })
    if (resp.status != 200 || resp.data?.code != 0) {
        logger.warn(`cookie失效:${JSON.stringify(resp.data)}`)
        return false
    }
    return true
}