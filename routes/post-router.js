import express from "express";
import {
  getPostMessages,
  createPostMessage,
  updatePostMessage,
  deletePostMessage,
  updatePostMessageLikeCount,
} from "../controllers/post-ctrl.js";

const router = express.Router();

router.get("/posts", getPostMessages);
router.post("/posts", createPostMessage);
router.patch("/posts/:id", updatePostMessage);
router.patch("/posts/:id/likecount", updatePostMessageLikeCount);
router.delete("/posts/:id", deletePostMessage);
// router.get('/post/:id', getPostMessageById)

export default router;
