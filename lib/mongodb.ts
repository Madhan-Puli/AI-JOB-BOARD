import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri || !uri.startsWith("mongodb")) {
  throw new Error("Invalid or missing MONGODB_URI");
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise;