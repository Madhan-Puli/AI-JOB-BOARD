import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI");

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (!global._mongo) {
  global._mongo = client.connect();
}

clientPromise = global._mongo;

export default clientPromise;