import express from "express";
// import { check, validationResult } from 'express-validator/check';
// import auth from '../../middleware/auth';
import { Router } from "express";
const router = Router();

import * as ProfileController from "../controller/profile.controller.js";
import authAdmin from "../middleware/authAdmin.js";

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.get("/me", ProfileController.getProfileMe);

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.post("/", authAdmin, ProfileController.createProfile);

// @route       GET api/profile
// @desc        GET all profile
// @access      Public
router.get("/", authAdmin, ProfileController.getProfiles);

// @route       GET api/profile/user/user_id
// @desc        GET  profile by user ID
// @access      Public
router.get("/user/:user_id", ProfileController.getById);

// @route       DELETE api/profile
// @desc        Delete profile, use & posts
// @access      Private
router.delete("/", authAdmin, ProfileController.deleteProfile);

// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put("/experience", authAdmin, ProfileController.updateProfile);

export default router;
