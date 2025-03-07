import  Transaction  from "../models/Transaction.js";
import axios from "axios";


// simulate payment processing 
const proceesPayment = async (req, res) => {
    const {userId, amount, provider, transactionId } =req.body;
    try {
        if (!userId || !amount|| !provider|| !transactionId) {
            res.status(400).json({message: "missing required fields"});
            
        }
        // simulate API call to Ethiopian payment provider
        const paymentResponse = {
            status: "success",
            message: "payment processed successfully",
            transactionId,
        };
if (paymentResponse.status === "success") {
    const transaction = await Transaction.create({
        userId,
        amount,
        provider,
        transactionId,
        status: 'success',
    });
    return res.status(201).json(transaction);
    
} else {
    return res.status(400).json({message: "payment failed"});
}


}catch (error) {
    res.status(500).json({message:'server error', error:error.message})

    }
};

export const verifyPayment= async (req, res) =>{

    try {
        const {transactionId, provider} = req.body;

        if (!transactionId || !provider) {
            res.status(400).json({message: "missing transactionId or provider"});
        } 
        let verificationUrl= "";
  // select the correct payment provider verification API
  if (provider === 'Chapa') {
    verificationUrl = `https://api.chapa.co/v1/transaction/verify/${transactionId}`;
  } else if (provider ==="telebirr") {
    verificationUrl= `https://api.telebirr.com/transaction/verify/${transactionId}`;
  } else if (provider === "cbe"){
    verificationUrl= `https://api.cbe.com/payment/verify/${transactionId}`;
  } else {
    return res.status(400).json({message: "invalid provider"});
  }
  // make the verification request 
  const response = await axios.get(verificationUrl, {
    headers: {Authorization: `Bearer ${process.env.PAYMENT.API.KEY}`},
  });
   const { status , message} = response.data;

   // update transaction in database 
   const transaction = await Transaction.findByIdAndUpdate(
    {transactionId : transactionId },
    {status},
    {new : true}
   );
   if(!transaction) {
    return res.status(404).json({message: "transaction not found"});
   }
   res.json({message: "payment verified", status, transaction});
} catch (error) {
    console.error('payment verification error:', error.message);
    res.status(500).json({message: "internal server error"});
}
};
// get transaction history
export const getTransactionHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found for this user" });
        }

        res.json({ transactions });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {proceesPayment};