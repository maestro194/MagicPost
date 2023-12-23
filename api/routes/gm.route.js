import express from 'express';
import mongoose from 'mongoose';
import { gmHome, gmUsers, gmPackages } from '../controllers/user.controller.js';

const router = express.Router();

router.post('gm/home', gmHome)
router.post('gm/users', gmUsers)
router.post('gm/packages', gmPackages)

export default router;