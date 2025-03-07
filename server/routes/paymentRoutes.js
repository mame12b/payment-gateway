import express from 'express';
import { proceesPayment, verifyPayment, getTransactionHistory } from "../controllers/paymentController.js";
import { paymentLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

router.post('/pay',  proceesPayment, paymentLimiter);
router.get('/history', getTransactionHistory);
router.post('/verify', verifyPayment);



export default router;
