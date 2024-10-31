import { MongoClient, Db, MongoClientOptions } from 'mongodb';

let url = 'mongodb://data:27017';
let options: MongoClientOptions = {}

export let mongoClient: MongoClient | null = null;

export const gfDb = async (): Promise<Db> => {
  if (!mongoClient) {
    mongoClient = new MongoClient(url, options);
    await mongoClient.connect();
    console.log(`[mongodb] ${url}`);
  }
  return mongoClient.db('gf');
};

