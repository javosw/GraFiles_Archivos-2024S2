import { MongoClient } from "mongodb";
let options = {};
let url = 'mongodb://localhost:27017';
export let CustomMongoClient = new MongoClient(url, options);
