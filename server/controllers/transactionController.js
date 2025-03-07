import Transaction from "../models/Transaction.js";

// 📌 Create Transaction Entry (after payment)
export const createTransaction = async (req, res) => {
  try {
    const { userId, amount, currency, provider, transactionId } = req.body;

    if (!userId || !amount || !currency || !provider || !transactionId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTransaction = new Transaction({
      userId,
      amount,
      currency,
      provider,
      transactionId,
      status: "pending",
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction", error: error.message });
  }
};

// 📌 Get User Transactions
export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions", error: error.message });
  }
};

// 📌 Verify Transaction (Check in database)
export const verifyTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findOne({ transactionId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction verified", transaction });
  } catch (error) {
    res.status(500).json({ message: "Verification error", error: error.message });
  }
};
