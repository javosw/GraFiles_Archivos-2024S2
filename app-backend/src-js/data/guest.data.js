export async function getUser(db, data) {
    try {
        const collection = db.collection('users');
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    }
    catch (error) {
    }
    return null;
}
