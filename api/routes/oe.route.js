import express from 'express';

import { 
  oeTransactions,
	oeCreatePackages,
  oePackages,
  oeSendPackage,
  oeReceivePackage,
  oeDeliverPackage
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/transactions/:id', oeTransactions)
router.get('/packages/:id', oePackages)
router.post('/createpackage', oeCreatePackages)
router.put('/sendpackage', oeSendPackage)
router.put('/receivepackage', oeReceivePackage)
router.put('/deliverpackage', oeDeliverPackage)


export default router;

