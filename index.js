import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import mongoose from "mongoose";
import videoRoutes from "./routes/videos.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log("MongoDB Connected"))
 .catch((err) => console.log(err));

app.get("/", (req, res) => {
 res.json("Hello World!");
});

app.use("/api/videos", videoRoutes);

const port = process.env.PORT || 3030;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
