import mongoose from "mongoose";

// Global cache for mongoose connection in serverless environment
let cached = global.mongoose;

if (!cached) {
 cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
 try {
  // Return cached connection if exists
  if (cached.conn) {
   console.log("Using cached MongoDB connection");
   return cached.conn;
  }

  // Create new connection promise if doesn't exist
  if (!cached.promise) {
   const opts = {
    bufferCommands: false, // Disable buffering for serverless
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds socket timeout
   };

   cached.promise = mongoose
    .connect(process.env.MONGODB_URI, opts)
    .then((mongoose) => {
     console.log(`MongoDB Connected: ${mongoose.connection.host}`);
     return mongoose;
    });
  }

  // Await the connection promise
  cached.conn = await cached.promise;

  // Handle connection events
  mongoose.connection.on("error", (err) => {
   console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
   console.log("MongoDB disconnected");
   // Reset cache on disconnect
   cached.conn = null;
   cached.promise = null;
  });

  return cached.conn;
 } catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  // Reset promise on error
  cached.promise = null;
  throw error;
 }
};

// Remove the SIGINT handler - Vercel handles process termination automatically

export default connectDB;
