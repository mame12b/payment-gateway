import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js';
import  paymentRoutes from "./routes/paymentRoutes.js";
import  connectDB  from "./config/db.js";
import { ipTracker } from "./middlewares/iptracking.js";
import transactionRoutes from "./routes/transactionRoutes.js"
import { paymentLimiter } from "./middlewares/rateLimit.js";

dotenv.config();
connectDB();

const app= express();

// middleware
app.use(express.json()); //parse json body
app.use(cors());
app.use(ipTracker);  // 🛡️ Apply IP Tracking Middleware Globally

//route

app.use('/api/users', userRoutes);
app.use('/api/payments',paymentLimiter, paymentRoutes);
app.use("/api/transactions", transactionRoutes);

// test route 
app.get('/', (req, res)=>{
  res.send(`User IP: ${res.clientIp}`);
});

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/payment-gateway", {
    useNewUrlParser: true,   // ✅ Corrected option
    useUnifiedTopology: true,
  })
  
    .then(() =>console.log("mongobd connected"))
    .catch((err)=>console.error("mongodb connection error:", err))

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=> console.log("server running on port ${PORT)"));