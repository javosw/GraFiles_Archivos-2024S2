import { Db, ObjectId } from 'mongodb';
import { ModelFile, ModelFolder } from '../model/worker.model.js';

export async function getFolder(db: Db, data: { _id: ObjectId }): Promise<ModelFolder | null> {
    try {
        const collection = db.collection("folders");
        const doc = await collection.findOne(data);
        if (doc) {
            return doc as ModelFolder;
        }
    } catch (error) {
    }
    finally {
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


