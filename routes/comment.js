import { Router } from "express";
const router = Router();

import * as CommentController from "../controller/comment.controller.js";
import authAdmin from "../middleware/authAdmin.js";

router.post("/:postId", authAdmin, CommentController.commentCreate);
router.post("/nested/:id", authAdmin, CommentController.nestedCommentCreate);
router.get("/", authAdmin, CommentController.getComments);
router.delete('/:postId', CommentController.removeComment)
router.patch('/:id', CommentController.updateComment)

export default router;
