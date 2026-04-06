import { Db, MongoClient } from "mongodb"

function getEnv(name: "MONGODB_URI" | "MONGODB_DB"): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name} in .env.local`)
  return value
}

const uri = getEnv("MONGODB_URI")
const dbName = getEnv("MONGODB_DB")

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

async function getClient(): Promise<MongoClient> {
  if (global._mongoClient) return global._mongoClient

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect()
  }

  try {
    const client = await global._mongoClientPromise
    global._mongoClient = client
    return client
  } catch (error) {
    global._mongoClientPromise = undefined
    throw error
  }
}

export async function connectToDatabase(): Promise<Db> {
  const client = await getClient()
  return client.db(dbName)
}