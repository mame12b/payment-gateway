import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, enum: ["CBE", "Telebirr", "Chapa"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "ETB" },
    status: { type: String, enum: ["initiated", "processing", "successful", "failed"], default: "initiated" },
    providerResponse: { type: Object }, // Stores provider response
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
