import { ModelGetSession, ModelGetSessionOk } from "../model/guest.model.js";

export async function getUser(data: ModelGetSession): Promise<ModelGetSessionOk | null> {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');

    try {
        await CustomMongoClient.connect();
        const collection = CustomMongoClient.db("gf").collection("users");
        const doc = await collection.findOne(data);
        if (doc) {
            await CustomMongoClient.close();
            return doc as unknown as ModelGetSessionOk
        }
    } catch (error) {
    }
    finally {
        await CustomMongoClient.close();
    }
    return null;
}