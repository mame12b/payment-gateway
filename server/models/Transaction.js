import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const transactionSchema= new mongoose.Schema(
    {
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required :true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "ETB",
    },
    provider: {
        type: String,
        enum : ['CBE', 'telebirrr','Chapa'],
        required:true,
    },
    status: {
        type: String,
       enum: ['pending', 'success', 'failed'],
       default: 'pending',
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    encryptedDetails: { 
        type: String 
    }, // Stores encrypted transaction details

},
 {timestamps: true}
);

// Middleware to encrypt transaction details before saving
transactionSchema.pre('save', async function (next) {
    if (!this.isModified('transactionId')) return next();

    const salt = await bcrypt.genSalt(10);
    this.encryptedDetails = await bcrypt.hash(this.transactionId, salt);
    next();
});


const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;