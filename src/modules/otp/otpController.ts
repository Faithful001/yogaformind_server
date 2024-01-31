import bcrypt from "bcryptjs";
import Otp from "./otpModel";
import User from "../user/userModel";
import { Request, Response } from "express";
import { Response as Res } from "../../utils/response.util";
import { OtpMethods } from "../../utils/otp.util";

export class OtpController {
	public static async verifyOtp(req: Request, res: Response) {
		try {
			const { otp, user_id } = req.body;
			const otpInDB = await Otp.findOne({ user_id });
			const compareOtp = await bcrypt.compare(otp, otpInDB.otp);
			switch (true) {
				case !compareOtp:
					return Res.sendResponse({
						res,
						status: 401,
						success: false,
						error: "Invalid otp",
					});
				case otpInDB.status == "expired":
					return Res.sendResponse({
						res,
						status: 401,
						success: false,
						error: "Otp has expired",
					});
				case otpInDB.status == "used":
					return Res.sendResponse({
						res,
						status: 401,
						success: false,
						error: "Otp has been used",
					});

				default:
					const user = await User.findById(user_id);
					await OtpMethods.changeOtpStatusToUsed(user._id.toString());
					return Res.sendResponse({
						res,
						status: 200,
						success: true,
						message: "Otp verified. Login successful",
						data: user,
					});
			}
		} catch (error: any) {
			Res.sendResponse({
				res,
				status: 500,
				success: false,
				error: error.message,
			});
		}
	}
}
