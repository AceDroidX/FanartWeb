import axios from "axios";
import logger from "../logger";

export {
    sendMsg,
    // sendLogToKHL,
}

const KHLAPIPREFIX = 'https://www.kaiheila.cn'

async function sendMsg(msg: string, type: string = 'msg') {
    if (!process.env.khl_msg_channel_id) {
        logger.error('khl_msg_channel_id未配置')
        return
    }
    const msg_channel_id = process.env.khl_msg_channel_id.split(',')
    const promise_list = msg_channel_id.map(async (channel_id) => {
        sendToKHL(msg, channel_id)
    })
    return await Promise.all(promise_list)
}

async function sendLogToKHL(log: string) {
    if (!process.env.khl_log_channel_id) {
        logger.error('khl_log_channel_id未配置')
        return
    }
    return await sendToKHL(log, process.env.khl_log_channel_id)
}

async function sendToKHL(msg: string, target_id: string) {
    if (!process.env.KHL_TOKEN) {
        logger.error('KHL_TOKEN未配置')
        return
    }
    try {
        logger.info(`发送开黑啦消息: ${msg}`)
        await axios.post(KHLAPIPREFIX + '/api/v3/message/create', {
            target_id: target_id,
            content: msg
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bot ' + process.env.KHL_TOKEN
            }
        })
    } catch (error) {
        logger.error(`开黑啦消息发送错误：\n${JSON.stringify(error)}`);
    };
}