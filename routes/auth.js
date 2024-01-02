import * as AuthController from '../controller/auth.controller.js'
import { Router } from "express";
const router = Router();

import authAdmin from '../middleware/authAdmin.js';

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', authAdmin, AuthController.authGet);

// @route       POST api/auth
// @desc        Authenticate user & get token
// @access      Public
router.post('/', AuthController.authUser);

export default router;