import mongoose from "mongoose";

const globalAny = global;

// Use a global variable to prevent multiple connections in development
let isConnected = globalAny.mongoose?.isConnected || false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);
  isConnected = db.connections[0].readyState;
  globalAny.mongoose = { isConnected };

  console.log("✅ MongoDB connected to", process.env.MONGODB_URI);
}
