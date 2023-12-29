import express from 'express';

import { wmUsers, wmPackages, wmDeleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users/:id', wmUsers)
router.get('/packages', wmPackages)
router.delete('/delete', wmDeleteUser)

export default router;

// Path: api/routes/wm.route.js