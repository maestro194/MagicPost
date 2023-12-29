import express from 'express';

import { 
    createTransaction, 
    createTransactionStatus, 
    getFromTransactions,
    getToTransactions, 
    getTransaction 
} from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/create', createTransaction);
router.post('/createstatus', createTransactionStatus);
router.get('/fromtransactions/:id', getFromTransactions);
router.get('/totransactions/:id', getToTransactions);
router.get('/:id', getTransaction);

export default router;