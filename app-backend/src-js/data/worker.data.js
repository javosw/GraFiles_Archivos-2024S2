export async function getFolder(data) {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');
    try {
        await CustomMongoClient.connect();
        const collection = CustomMongoClient.db("gf").collection("folders");
        const doc = await collection.findOne(data);
        if (doc) {
            await CustomMongoClient.close();
            return doc;
        }
    }
    catch (error) {
    }
    finally {
        await CustomMongoClient.close();
    }
    return null;
}
export async function addFolder(filter) {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');
    try {
        await CustomMongoClient.connect();
        const db = CustomMongoClient.db("gf");
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
        await CustomMongoClient.close();
        return descendant._id;
    }
    catch (error) {
    }
    finally {
        await CustomMongoClient.close();
    }
    return null;
}
