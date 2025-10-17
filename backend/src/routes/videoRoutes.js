import express from "express";
import {addVideo, getAllVideos, getVideoById, updateVideo,deleteVideo} from "../controllers/videoController.js";
import validateId from "../middleware/validateId.js";
import  validateVideoBody  from "../middleware/validateBody.js";

const router = express.Router();

router.post("/", validateVideoBody, addVideo);
router.get("/", getAllVideos);
router.get("/:id", validateId, getVideoById);
router.put("/:id", validateId, validateVideoBody, updateVideo);
router.delete("/:id", validateId, deleteVideo);

export default router;
