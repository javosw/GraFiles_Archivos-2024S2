export const getTrashFolder = async (db) => {
    try {
        const collection = db.collection("folders");
        return await collection.findOne({ _id: 'trash' });
    }
    catch (error) {
    }
    finally {
    }
    return null;
};
export const addUser = async (db, data) => {
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
    }
    catch (error) {
    }
    finally {
    }
    return null;
};
