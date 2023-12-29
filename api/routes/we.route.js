import express from 'express';

import { 
    wePackages ,
    weSendPackage,
    weTransferPackage
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/packages/:id', wePackages)
router.put('/sendpackage', weSendPackage)
router.put('/transferpackage', weTransferPackage)

export default router;

