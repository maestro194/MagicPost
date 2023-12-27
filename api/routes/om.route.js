import express from 'express';

import { omUsers, omPackages, omDeleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', omUsers)
router.get('/packages', omPackages)
router.delete('/delete', omDeleteUser)

export default router;

// Path: api/routes/om.route.js