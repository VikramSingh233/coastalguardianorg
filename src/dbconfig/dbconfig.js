import dotenv from "dotenv";
dotenv.config();


import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB;

if (!MONGODB_URI) {
  throw new Error("❌ MONGO_URL is not defined in environment variables.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    }).catch(err => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
