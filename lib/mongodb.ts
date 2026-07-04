import { MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URI;

if (!rawUri || !rawUri.startsWith("mongodb")) {
  throw new Error("Invalid or missing MONGODB_URI");
}

const uri = rawUri.replace(
  /^mongodb:\/\/(.+@cluster[^/?]+\.mongodb\.net)/,
  "mongodb+srv://$1"
);

let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;
