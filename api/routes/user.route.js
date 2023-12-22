import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)

router.get('/gm/home', gmHome)
router.get('/gm/users', gmUsers)
router.get('/gm/packages', gmPackages)

export default router;