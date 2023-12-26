import express from 'express';
import { gmUsers, gmPackages, gmDeleteUser, gmOffices } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', gmUsers)
router.get('/packages', gmPackages)
router.get('/offices', gmOffices)
router.delete('/delete', gmDeleteUser)

export default router;