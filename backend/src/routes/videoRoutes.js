import express from "express";
import { addVideo, getAllVideos } from "../controllers/videoController.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/", getAllVideos);

export default router;
