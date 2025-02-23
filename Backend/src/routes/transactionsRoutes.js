import { Router } from "express";
import { createTransaction, getAllTransactions } from "../controllers/transactionsController.js";

const router = Router()

router.get('/getAll/:uid' , getAllTransactions);

router.post('/donate' , createTransaction);

export default router;