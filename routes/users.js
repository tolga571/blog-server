import { Router } from "express";
const router = Router();

import * as UserController from '../controller/user.controller.js'
import authAdmin from "../middleware/authAdmin.js";

router.post("/", UserController.userCreate);
router.get("/", authAdmin, UserController.getUsers);
router.delete('/:id',authAdmin, UserController.remove)
router.patch('/:id', UserController.updateUser)

// User export
export default router;