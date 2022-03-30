import { Collection } from "mongodb";
import { MongoController } from "../MongoController";
import { Card as CardBase, Emoji, Picture, User } from 'fanartweb-shared';
import logger from "../logger";

export {
    MongoDBs,
    IDBAppContext,
    IDBAppState,
    Card,
}

interface IDBAppContext {
    mongo: MongoController;
}
interface IDBAppState {
    // amdb: Collection;
}

type MongoDBs = {
    cardlist: Collection
    config: Collection
    blacklist: Collection
    whitelist: Collection
    admin: Collection
    token: Collection
}

class Card extends CardBase {
    static getFromRaw(raw: any): Card | undefined {
        try {
            if (raw.desc.type == 1) {
                logger.debug(`转发动态:${raw.desc.dynamic_id_str}`)
                // console.log(raw)
                return undefined
            }
            else if (raw.desc.type == 4) {
                logger.debug(`纯文字动态:${raw.desc.dynamic_id_str}`)
                return undefined
            }
            else if (raw.desc.type == 8) {
                logger.debug(`视频动态:${raw.desc.dynamic_id_str}`)
                return undefined
            }
            else if (raw.desc.type == 64) {
                logger.debug(`专栏动态:${raw.desc.dynamic_id_str}`)
                return undefined
            }
            else if (raw.desc.type != 2) {
                logger.warn(`非图片动态:${JSON.stringify(raw)}`)
                return undefined
            }
            return new Card(
                Number(raw.desc.dynamic_id_str),
                raw.desc.timestamp,
                JSON.parse(raw.card).item.description,
                raw.display.like_info !== undefined ?
                    raw.display.like_info.like_users.some((user: { uid: number; }) => user.uid == 434334701) : false,
                { id: raw.desc.user_profile.info.uid, name: raw.desc.user_profile.info.uname, avatar: raw.desc.user_profile.info.face } as User,
                raw.display.emoji_info !== undefined ?
                    raw.display.emoji_info.emoji_details.map((emoji: { text: any; url: any; }) => ({ text: emoji.text, url: emoji.url } as Emoji)) : [],
                JSON.parse(raw.card).item.pictures !== undefined ?
                    JSON.parse(raw.card).item.pictures.map((picture: any) => Picture.getFromRaw(picture)) : []
            )
        } catch (e) {
            logger.error(`解析Card失败:${JSON.stringify(raw)}`)
            throw e
        }
    }
}