import express from 'express';

import {
	oeCreatePackages,
  oePackages,
  oeSendPackage,
  oeReceivePackage,
  oeDeliverPackage
} from '../controllers/user.controller.js';

const router = express.Router();
router.get('/packages/:id', oePackages)
router.post('/createpackage', oeCreatePackages)
router.put('/sendpackage', oeSendPackage)
router.put('/receivepackage', oeReceivePackage)
router.put('/deliverpackage', oeDeliverPackage)


export default router;

