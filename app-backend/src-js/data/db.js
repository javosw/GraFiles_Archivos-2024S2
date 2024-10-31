import { MongoClient } from 'mongodb';
let url = 'mongodb://data:27017';
let options = {};
export let mongoClient = null;
export const gfDb = async () => {
    if (!mongoClient) {
        mongoClient = new MongoClient(url, options);
        await mongoClient.connect();
        console.log(`[mongodb] ${url}`);
    }
    return mongoClient.db('gf');
};
