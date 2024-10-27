import { Db } from "mongodb";
import { ModelGetSession, ModelGetSessionOk } from "../model/guest.model.js";

export async function getUser(db: Db, data: { username: string; password: string; }): Promise<ModelGetSessionOk | null> {
    try {
        const collection = db.collection<ModelGetSessionOk>('users');
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    } catch (error) {
        console.log({ msg: '@getUser.data' });
    }
    finally {
    }
    return null;
}
