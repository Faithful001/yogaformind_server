import express from "express";
import { OtpController } from "./otpController";

const otpRouter = express.Router();

otpRouter.post("/verify-otp", OtpController.verifyOtp);

export default otpRouter;
