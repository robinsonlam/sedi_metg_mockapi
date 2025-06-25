import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "test";

let client: MongoClient;
let db: Db;

export async function connect(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    db = undefined as any;
    client = undefined as any;
  }
}
