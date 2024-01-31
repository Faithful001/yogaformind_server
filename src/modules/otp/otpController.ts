import bcrypt from "bcryptjs";
import Otp from "./otpModel";
import User from "../user/userModel";
import { Request, Response } from "express";
import { Response as Res } from "../../utils/response.util";

export class OtpController {
	public static async verifyOtp(req: Request, res: Response) {
		try {
			const { otp, user_id } = req.body;
			const otpInDB = await Otp.findOne({ user_id });
			const compareOtp = await bcrypt.compare(otp, otpInDB);
			if (!compareOtp) {
				return Res.sendResponse({
					res,
					status: 401,
					success: false,
					error: "Invalid otp",
				});
			}
			const user = await User.findById(user_id);
			Res.sendResponse({
				res,
				status: 200,
				success: true,
				message: "Login successful",
				data: user,
			});
		} catch (error: any) {
			Res.sendResponse({ res, status: 500, success: false, error });
		}
	}
}
