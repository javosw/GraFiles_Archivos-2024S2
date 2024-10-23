export async function getUser(db, data) {
    try {
        const collection = db.collection('users');
        const doc = await collection.findOne(data);
        if (doc) {
            return doc;
        }
    }
    catch (error) {
        console.log({ msg: '@getUser.data' });
    }
    finally {
    }
    return null;
}
