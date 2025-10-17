import Video from "../models/videoModel.js";

export const addVideo = async (req, res) => {
  try {
    const { title, creator, videoUrl, description, category } = req.body;
    if (!title || !creator || !videoUrl) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const video = await Video.create({ title, creator, videoUrl, description, category });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(Math.max(1, Number(req.query.limit) || 12), 100);
    const q = req.query.q ? String(req.query.q).trim() : "";
    const category = req.query.category ? String(req.query.category).trim() : "";

    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { creator: regex }, { description: regex }, { category: regex }];
    }
    if (category) {
      filter.category = category;
    }

    const total = await Video.countDocuments(filter);
    const pages = Math.max(1, Math.ceil(total / limit));
    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ data: videos, page, pages, total });
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch videos", error: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch video", error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    const allowed = ["title", "creator", "videoUrl", "description", "category"];
    const toUpdate = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) toUpdate[key] = updates[key];
    }
    if (Object.keys(toUpdate).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }
    const updated = await Video.findByIdAndUpdate(id, toUpdate, { new: true });
    if (!updated) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Cannot update video", error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Video not found" });
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete video", error: error.message });
  }
};
