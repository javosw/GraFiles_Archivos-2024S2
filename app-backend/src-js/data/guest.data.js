export async function getUser(data) {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');
    try {
        await CustomMongoClient.connect();
        const collection = CustomMongoClient.db("gf").collection("users");
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