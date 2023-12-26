import express from 'express';
import { gmUsers, gmPackages, gmDeleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', gmUsers)
router.get('/packages', gmPackages)
router.delete('/delete', gmDeleteUser)

export default router;