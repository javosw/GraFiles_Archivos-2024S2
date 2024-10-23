import { Db } from "mongodb";
import { ModelGetSession, ModelGetSessionOk } from "../model/guest.model.js";

export async function getUser(db: Db, data: ModelGetSession): Promise<ModelGetSessionOk | null> {
    try {
        const collection = db.collection('users');
        const doc = await collection.findOne(data);
        if (doc) {
            return doc as unknown as ModelGetSessionOk;
        }
    } catch (error) {
        console.log({msg:'@getUser.data'});
    }
    finally {
    }
    return null;
}
