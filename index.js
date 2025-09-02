import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import connectDB from "./config/db.js";
import videoRoutes from "./routes/videos.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
 res.json("Hello World!");
});

app.use("/api/videos", videoRoutes);

const port = process.env.PORT || 3030;
app.listen(port, async () => {
 try {
  await connectDB();
  console.log(`Server is running on port ${port}`);
 } catch (error) {
  console.log(error);
 }
});
