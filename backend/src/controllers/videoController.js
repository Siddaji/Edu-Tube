import Video from "../models/videoModel.js";


export const addVideo = async (req, res) => {
  try {
    const { title, description, url, thumbnailUrl } = req.body;
    const newVideo = await Video.create({ title, description, url, thumbnailUrl });
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json({ data: videos, total: videos.length });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};



export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


export const updateVideo = async (req, res) => {
  try {
    const { title, description, url, thumbnailUrl } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description, url, thumbnailUrl },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
