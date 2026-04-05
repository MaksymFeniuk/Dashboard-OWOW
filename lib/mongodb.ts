import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

type Cached = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: Cached | undefined
}

const cached: Cached = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((connection) => connection)
  }

  cached.conn = await cached.promise
  return cached.conn
}
