import express from "express";
import requestIp from "request-ip";


const app =express();

export const ipTracker = (req, res, next) =>{
    res.clientIp = requestIp.getClientIp(req); //get user Ip
    next();
};