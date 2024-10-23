export async function getUser(db, data) {
    //const { CustomMongoClient } = await import('./CustomMongoClient.js');
    try {
        const collection = db.collection('users');
        const doc = await collection.findOne(data);
        if (doc) {
            //await CustomMongoClient.close();
            return doc;
        }
    }
    catch (error) {
        console.log({ msg: '@getUser.data' });
    }
    finally {
        //await CustomMongoClient.close();
    }
    return null;
}
