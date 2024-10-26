export async function getFolder(db, data) {
    try {
        const collection = db.collection("folders");
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    }
    catch (error) {
    }
    finally {
    }
    return null;
}
export async function addFolder(db, filter) {
    try {
        const foldersGet = db.collection("folders");
        const getAncestor = await foldersGet.findOne({ _id: filter.ancestor });
        if (!getAncestor) {
            throw new Error();
        }
        const ancestor = getAncestor;
        const foldersAdd = db.collection("folders");
        const addDescendant = await foldersAdd.insertOne({
            name: filter.name,
            ancestor: ancestor._id,
            folders: [],
            files: []
        });
        const getDescendant = await foldersGet.findOne({ _id: addDescendant.insertedId });
        if (!getDescendant) {
            throw new Error();
        }
        const descendant = getDescendant;
        await foldersGet.updateOne({ _id: ancestor._id }, { $push: { folders: descendant._id } });
        return descendant._id;
    }
    catch (error) {
    }
    finally {
    }
    return null;
}
export async function addFile(db, filter) {
    try {
        const folders = db.collection("folders");
        const folder = await folders.findOne({ _id: filter.ancestor });
        if (!folder) {
            throw new Error();
        }
        const files = db.collection("files");
        const file = await files.insertOne({
            ancestor: filter.ancestor,
            file: filter.file,
        });
        await folders.updateOne({ _id: filter.ancestor }, { $push: { files: file.insertedId } });
        return file.insertedId;
    }
    catch (error) {
    }
    finally {
    }
    return null;
}
export async function getFile(db, data) {
    try {
        const collection = db.collection("files");
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    }
    catch (error) {
    }
    finally {
    }
    return null;
}
