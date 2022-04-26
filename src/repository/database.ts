import { MongoClient, Db } from "mongodb";

interface ConnectType {
  db: Db,
  client: MongoClient
}

let uri = process.env.MONGODB_URI || ""
let dbName = process.env.MONGODB_DB

let cachedClient: any = null
let cachedDb: any = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export default async function connect(): Promise<ConnectType> {
    if (cachedClient && cachedDb) {
      return { client: cachedClient, db: cachedDb }
    }
  
    const client = await MongoClient.connect(uri) 
    const db = client.db(dbName)
  
    cachedClient = client
    cachedDb = db
  
    return { client, db }
  }