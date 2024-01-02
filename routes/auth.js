import * as AuthController from '../controller/auth.controller.js'
import { Router } from "express";
const router = Router();

// From Middleware
import authAdmin from '../middleware/authAdmin.js';

// @route       GET api/auth
// @desc        Test route
router.get('/', authAdmin, AuthController.authGet);

// @route       POST api/auth
// @desc        Authenticate user & get token
router.post('/', AuthController.authUser);

export default router;