import express from "express";
import { createTransaction, getUserTransactions, verifyTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/create", createTransaction);
router.get("/:userId", getUserTransactions);
router.get("/verify/:transactionId", verifyTransaction);

export default router;
