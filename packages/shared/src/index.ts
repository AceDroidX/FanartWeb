import { Document, Long, WithId } from "mongodb";

export {
    MongoDoc,
    Tag,
    Card,
    Picture,
    User,
    Emoji,
    GlobalConfig,
    UserInList,
    AdminUser,
    Token,
    CardsViewTypes,
    CheckedTypes,
    UserTypes,
}

// interface Tag {
//     id: number;
//     name: string;
// }

type MongoDoc<T> = T & WithId<Document>

type Tag = {
    id: number;
    name: string;
}

type User = {
    id: number
    name: string
    avatar?: string
}

class Picture {
    img_height: number;
    img_width: number;
    img_size: number;
    img_src: string;
    constructor(img_height: number, img_width: number, img_size: number, img_src: string) {
        this.img_height = img_height;
        this.img_width = img_width;
        this.img_size = img_size;
        this.img_src = img_src;
    }
    static getFromRaw(raw: any): Picture {
        return new Picture(raw.img_height, raw.img_width, raw.img_size, raw.img_src);
    }
}

type Emoji = {
    text: string;
    url: string;
}

class Card {
    id: Long;
    timestamp: number;
    text: string;
    isliked: boolean;
    checked?: boolean;
    user: User;
    emoji: Emoji[];
    pictures: Picture[];
    constructor(id: Long, timestamp: number, text: string, isliked: boolean, user: User, emoji: Emoji[], pictures: Picture[]) {
        this.id = id;
        this.timestamp = timestamp;
        this.text = text;
        this.isliked = isliked;
        this.user = user;
        this.emoji = emoji;
        this.pictures = pictures;
    }
}

type UserInList = User & {
    ts: number;
}

type GlobalConfig = {
    type: "global"
    new_card_time: number
}

type AdminUser = {
    type: "admin"
    username: string
    password: string
    salt: string
}

type Token = {
    ts: number
    exp: number
    username: string
    token: string
}

class CardsViewTypes {
    static readonly NORMAL = { name: '原始视图', value: 'normal' }
    static readonly DETAIL = { name: '详细数据', value: 'detail' }
    static readonly ALL = { name: '全部数据', value: 'all' }
}

class CheckedTypes {
    static readonly UNDF = { name: '未审核', value: undefined }
    static readonly TRUE = { name: '✔️已通过', value: true }
    static readonly FALSE = { name: '❌未通过', value: false }
}

class UserTypes {
    static readonly UNDF = { name: '未标记用户', value: undefined }
    static readonly WHITELIST = { name: '✔️白名单', value: 'whitelist' }
    static readonly BLACKLIST = { name: '❌黑名单', value: 'blacklist' }
}