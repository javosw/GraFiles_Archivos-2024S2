import { MongoClient, MongoClientOptions } from "mongodb";

let options: MongoClientOptions = {}

let url = 'mongodb://localhost:27017';
export let CustomMongoClient: MongoClient = new MongoClient(url, options);

