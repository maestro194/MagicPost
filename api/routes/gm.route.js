import express from 'express';
import { gmUsers, gmPackages } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', gmUsers)
router.get('/packages', gmPackages)

export default router;