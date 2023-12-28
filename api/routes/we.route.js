import express from 'express';

import { wePackages } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/packages/:id', wePackages)

export default router;

