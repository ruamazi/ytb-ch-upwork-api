import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// Get paginated videos
router.get("/", async (req, res) => {
 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 8; // number per page
 const skip = (page - 1) * limit;

 const [videos, total] = await Promise.all([
  Video.find().skip(skip).limit(limit),
  Video.countDocuments(),
 ]);

 res.json({ videos, total, page, pages: Math.ceil(total / limit) });
});

// Get single video
router.get("/:id", async (req, res) => {
 const video = await Video.findById(req.params.id);
 if (!video) return res.status(404).json({ error: "Video not found" });
 res.json(video);
});

// Add video (Admin)
router.post("/", async (req, res) => {
 const { title, link } = req.body;
 const video = new Video({ title, link });
 await video.save();
 res.status(201).json(video);
});

// Delete video (Admin)
router.delete("/:id", async (req, res) => {
 await Video.findByIdAndDelete(req.params.id);
 res.json({ success: true });
});

export default router;
