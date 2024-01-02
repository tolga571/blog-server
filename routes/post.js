import { Router } from "express";
const router = Router();

import * as PostController from "../controller/post.controller.js";
import authAdmin from "../middleware/authAdmin.js";

router.get("/", authAdmin, PostController.getPosts);
router.get("/posts/:postId/comments", PostController.getPostToComments);
router.post("/", authAdmin, PostController.postCreate);
router.patch('/:id', PostController.updatePost)
router.delete('/:id', PostController.removePost)

export default router;
