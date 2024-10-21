import { ObjectId } from 'mongodb';
import { ModelFolder } from '../model/worker.model.js';

export async function getFolder(data: { _id: ObjectId }): Promise<ModelFolder | null> {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');

    try {
        await CustomMongoClient.connect();
        const collection = CustomMongoClient.db("gf").collection("folders");
        const doc = await collection.findOne(data);
        if (doc) {
            await CustomMongoClient.close();
            return doc as ModelFolder;
        }
    } catch (error) {
    }
    finally {
        await CustomMongoClient.close();
    }
    return null;
}