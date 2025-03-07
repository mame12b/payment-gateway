import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { paymentLimiter } from "../middlewares/rateLimit.js";
import { ipTracker } from "../middlewares/iptracking.js";
import { proceesPayment } from "../controllers/paymentController.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/pay', ipTracker, paymentLimiter, proceesPayment);

export default router;