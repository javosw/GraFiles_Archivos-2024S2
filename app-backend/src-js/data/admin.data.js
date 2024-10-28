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
