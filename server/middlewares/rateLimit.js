import express from "express";
import rateLimit from "express-rate-limit";


const app = express();

export const paymentLimiter = rateLimit({
    windowMs : 15*60*100, //15 minutes
    max: 5,
    message: "Too many payment attempts from this IP, please try again later."
});