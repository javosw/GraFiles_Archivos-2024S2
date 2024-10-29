import { Db, ObjectId } from 'mongodb';
//
import { ModelTrashFolder } from '../model/admin.model.js';
import { ModelRole } from '../model/guest.model.js';

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

export const addUser = async (db: Db, data: { username: string, password: string, role: ModelRole }): Promise<ObjectId | null> => {
    try {
        const folders = db.collection("folders");

        const folderRoot = await folders.insertOne({
            name: 'root',
            ancestor: null,
            folders: [],
            files: []
        });

        const folderShared = await folders.insertOne({
            name: 'shared',
            ancestor: null,
            folders: [],
            files: []
        });

        const users = db.collection("users");
        let user = await users.insertOne({
            username: data.username,
            role: data.role,
            password: data.password,
            folderRoot: folderRoot.insertedId,
            folderShared: folderShared.insertedId
        });

        return user.insertedId;
    } catch (error) {
    }
    finally {
    }
    return null;
}