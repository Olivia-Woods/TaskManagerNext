import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log("MongoDB Connected!");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB Connection Failed:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

export default dbConnect;
