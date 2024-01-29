import { Response as Res } from "../../utils/response.util";
import { Validator } from "../../utils/validator.util";
import User from "../user/userModel";
import { Request, Response } from "express";

export class UserController {
	public static async signupUser(req: Request, res: Response) {
		try {
			const { first_name, last_name, mobile_number } = req.body;
			if (!first_name || !last_name || !mobile_number) {
				throw new Error("All fields are required");
			}
			const inputErrors = Validator.validateInputs(
				mobile_number,
				first_name,
				last_name
			);

			if (inputErrors.length > 0) {
				return Res.sendResponse({
					res,
					status: 400,
					success: false,
					error: inputErrors,
				});
			}
			const userExists = await User.findOne({ mobile_number });
			if (userExists) {
				throw new Error("User with this number already exists");
			}
			const user = await User.create({ first_name, last_name, mobile_number });
			Res.sendResponse({
				res,
				status: 200,
				success: true,
				message: "Signup successful",
				data: user,
			});
		} catch (error: any) {
			Res.sendResponse({ res, status: 500, success: false, error });
		}
	}

	public static async loginUser(req: Request, res: Response) {
		try {
			const { mobile_number } = req.body;
			if (!mobile_number) throw new Error("All fields are required");

			const inputErrors = Validator.validateInputs(mobile_number);

			if (inputErrors.length > 0) {
				return Res.sendResponse({
					res,
					status: 400,
					success: false,
					error: inputErrors,
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
