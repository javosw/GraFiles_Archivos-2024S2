import { DataGetSession, DataGetSessionOk, User } from "../data/guest.data.js";

export async function getUser(data: DataGetSession): Promise<DataGetSessionOk | null> {
    const { CustomMongoClient } = await import('./CustomMongoClient.js');

    try {
        await CustomMongoClient.connect();
        const collection = CustomMongoClient.db("gf").collection("users");
        const user = await collection.findOne(data);
        if (user) {
            await CustomMongoClient.close();
            return { username: user.username, role: user.role };
        }
    } catch (error) {
    }
    finally {
        await CustomMongoClient.close();
    }
    return null;
}
