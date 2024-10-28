import { Db } from 'mongodb';
//
import { ModelTrashFolder } from '../model/admin.model.js';

export const getTrashFolder = async (db: Db): Promise<ModelTrashFolder | null> => {
    try {
        const collection = db.collection<ModelTrashFolder>("folders");
        return await collection.findOne({ _id: 'trash' });
    } catch (error) {
    }
    finally {
    }
    return null;

}