import { UserInList } from "fanartweb-shared"
import { MongoController } from "./MongoController"

export async function getUserListRaw(this: MongoController, type: 'blacklist' | 'whitelist') {
    return await this.dbs[type].find().toArray()
}
export async function getUserList(this: MongoController, type: 'blacklist' | 'whitelist') {
    return (await this.getUserListRaw(type)).map(user => user.id)
}
export async function addUserList(this: MongoController, type: 'blacklist' | 'whitelist', user: UserInList) {
    await this.dbs[type].insertOne(user)
}
export async function deleteUserList(this: MongoController, type: 'blacklist' | 'whitelist', id: number) {
    await this.dbs[type].deleteOne({ id })
}
export async function updateUserList(this: MongoController, type: 'blacklist' | 'whitelist', user: UserInList) {
    await this.dbs[type].updateOne({ id: user.id }, { $set: user })
}
export async function getAllUserList(this: MongoController) {
    const result = await Promise.all([this.getUserList('blacklist'), this.getUserList('whitelist')])
    return { blacklist: result[0], whitelist: result[1] }
}
export async function getAllUserListRaw(this: MongoController) {
    const result = await Promise.all([this.getUserListRaw('blacklist'), this.getUserListRaw('whitelist')])
    return { blacklist: result[0], whitelist: result[1] }
}