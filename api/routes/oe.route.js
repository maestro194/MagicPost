import express from 'express';

import { 
  oeTransactions,
	oeCreatePackages,
  oePackages
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/transactions/:id', oeTransactions)
router.get('/packages', oePackages)
router.post('/createpackage', oeCreatePackages)


export default router;

