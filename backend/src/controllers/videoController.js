import Video from "../models/videoModel.js";

export const addVideo = async (req, res) => {
  try {
    const { title, creator, videoUrl, description } = req.body;
    if (!title || !creator || !videoUrl) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const video = await Video.create({ title, creator, videoUrl, description });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch videos", error: error.message });
  }
};
