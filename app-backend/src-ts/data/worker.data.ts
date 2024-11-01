import { Db, ObjectId } from 'mongodb';
import { ModelFile, ModelFolder, ModelSharedFolder } from '../model/worker.model.js';

export async function getFolder(db: Db, data: { _id: ObjectId }): Promise<ModelFolder | null> {
    try {
        const collection = db.collection<ModelFolder>("folders");
        return await collection.findOne(data);
    }
    catch (error) {
    }
    return null;
}

export async function getSharedFolder(db: Db, data: { _id: ObjectId }): Promise<ModelSharedFolder | null> {
    try {
        const folders = db.collection<ModelSharedFolder>("folders");
        return await folders.findOne(data);
    } catch (error) {
    }
    return null;
}

export async function addFolder(db: Db, filter: { ancestor: ObjectId, name: string }): Promise<ObjectId | null> {
    try {
        const foldersGet = db.collection<ModelFolder>("folders");

        const getAncestor = await foldersGet.findOne({ _id: filter.ancestor });
        if (!getAncestor) { throw new Error(); }
        const ancestor = getAncestor as ModelFolder;

        const foldersAdd = db.collection("folders");

        const addDescendant = await foldersAdd.insertOne({
            name: filter.name,
            ancestor: ancestor._id,
            folders: [],
            files: []
        });

        const getDescendant = await foldersGet.findOne({ _id: addDescendant.insertedId });
        if (!getDescendant) { throw new Error(); }
        const descendant = getDescendant as ModelFolder;

        await foldersGet.updateOne({ _id: ancestor._id }, { $push: { folders: descendant._id } });

        return descendant._id;
    } catch (error) {
    }
    finally {
    }
    return null;
}

export async function addFile(db: Db, filter: { ancestor: ObjectId, file: Express.Multer.File }): Promise<ObjectId | null> {
    try {
        const folders = db.collection<ModelFolder>("folders");

        const folder = await folders.findOne({ _id: filter.ancestor });
        if (!folder) { throw new Error(); }

        const files = db.collection("files");

        const file = await files.insertOne({
            ancestor: filter.ancestor,
            file: filter.file,
        });

        await folders.updateOne(
            { _id: filter.ancestor },
            { $push: { files: file.insertedId } }
        );

        return file.insertedId;
    } catch (error) {
    }
    finally {
    }
    return null;
}

export async function getFile(db: Db, data: { _id: ObjectId }): Promise<ModelFile | null> {
    try {
        const collection = db.collection<ModelFile>("files");
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    } catch (error) {
    }
    finally {
    }
    return null;
}

export const shareFile = async (db: Db, data: { idFile: string, fromUser: string, toUser: string }): Promise<number> => {
    try {
        type User = { folderShared: ObjectId };

        const users = db.collection<User>('users');
        const user = await users.findOne({ username: data.toUser });
        if (!user) { return 0 }

        type SharedFolder = { files: { idFile: ObjectId, fromUser: string }[] };

        const folders = db.collection<SharedFolder>('folders');
        const sharedFolder = await folders.findOne({ _id: user.folderShared });
        if (!sharedFolder) { return 0 }

        const modSharedFolder = await folders.updateOne(
            { _id: sharedFolder._id },
            {
                $push: {
                    files: {
                        idFile: new ObjectId(data.idFile),
                        fromUser: data.fromUser
                    }
                }
            }
        );
        return modSharedFolder.modifiedCount;
    }
    catch (error) { }

    return 0;
}

export const delFile = async (db: Db, data: { idFile: ObjectId }): Promise<number> => {
    try {
        type File = { _id: ObjectId, ancestor: ObjectId };

        const files = db.collection<File>('files');
        const file = await files.findOne({ _id: data.idFile });
        if (!file) { return 0 }

        type Folder = {
            _id: ObjectId | string;
            name: String;
            ancestor: ObjectId | null;
            folders: ObjectId[];
            files: ObjectId[];
        }

        const folders = db.collection<Folder>('folders');

        const modFolder = await folders.updateOne({ _id: file.ancestor }, { $pull: { files: data.idFile } });
        if (modFolder.modifiedCount != 1) { return 0 }

        const modTrash = await folders.updateOne({ _id: 'trash' }, { $push: { files: data.idFile } });
        return modTrash.modifiedCount;
    }
    catch (error) { }

    return 0;
}
