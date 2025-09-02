import mongoose from "mongoose";

const connectDB = async () => {
 try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);

  // Handle connection events
  mongoose.connection.on("error", (err) => {
   console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
   console.log("MongoDB disconnected");
  });

  // Handle app termination
  process.on("SIGINT", async () => {
   await mongoose.connection.close();
   console.log("MongoDB connection closed through app termination");
   process.exit(0);
  });

  return conn;
 } catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1);
 }
};

export default connectDB;
