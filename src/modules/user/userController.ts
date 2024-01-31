import { handleOtpSendingFlow } from "../../utils/handleotp_sendingflow.util";
import { Response as Res } from "../../utils/response.util";
import { SendOtpToUser } from "../../utils/send_otp_to_user.util";
import { Validator } from "../../utils/validator.util";
import { OtpController } from "../otp/otpController";
import User from "../user/userModel";
import { Request, Response } from "express";

export class UserController {
	public static async signupUser(req: Request, res: Response) {
		try {
			const { first_name, last_name, mobile_number } = req.body;

			if (!first_name || !last_name || !mobile_number) {
				throw new Error("All fields are required");
			}
			const inputError = Validator.validateInputs(
				mobile_number,
				first_name,
				last_name
			);

			if (inputError.length > 0) {
				return Res.sendResponse({
					res,
					status: 400,
					success: false,
					error: inputError,
				});
			}
			const userExists = await User.findOne({ mobile_number });
			if (userExists) {
				throw new Error("User with this number already exists");
			}
			const stringifiedOtp =
				userExists && (await handleOtpSendingFlow(userExists));
			//send the otp here / all the otp logic

			const user = await User.create({
				first_name,
				last_name,
				mobile_number,
			});
			Res.sendResponse({
				res,
				status: 200,
				success: true,
				message: "Signup successful. An otp was sent to your mobile number",
				data: { user, stringifiedOtp },
			});
		} catch (error: any) {
			Res.sendResponse({
				res,
				status: 500,
				success: false,
				error: error.message,
			});
		}
	}

	public static async loginUser(req: Request, res: Response) {
		try {
			const { mobile_number } = req.body;
			if (!mobile_number) {
				throw new Error("All fields are required");
			}

			const inputError = Validator.validateInputs(mobile_number);

			if (inputError.length > 0) {
				return Res.sendResponse({
					res,
					status: 400,
					success: false,
					error: inputError,
				});
			}
			const user = await User.findOne({ mobile_number });
			if (!user) {
				return Res.sendResponse({
					res,
					status: 404,
					success: false,
					error:
						"User with this mobile number does not exist. Try signing up instead",
				});
			}
			const stringifiedOtp = user && (await handleOtpSendingFlow(user));
			Res.sendResponse({
				res,
				status: 200,
				success: true,
				message: "User found. An otp was sent to your mobile number",
				data: { user, stringifiedOtp },
			});
		} catch (error: any) {
			return Res.sendResponse({
				res,
				status: 500,
				success: false,
				error: error?.message,
			});
		}
	}
}
