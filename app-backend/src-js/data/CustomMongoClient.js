import { MongoClient } from "mongodb";
let url = 'mongodb://localhost:27017';
export let CustomMongoClient = new MongoClient(url);
