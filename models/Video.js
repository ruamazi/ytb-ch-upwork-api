import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
 {
  title: { type: String, required: true },
  link: { type: String, required: true },
 },
 { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
