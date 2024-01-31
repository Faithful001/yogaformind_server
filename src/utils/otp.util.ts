import bcrypt from "bcryptjs";
import Otp from "../modules/otp/otpModel";

export class OtpMethods {
	public static async createOTPForClient() {
		try {
			const otp = Math.floor(Math.random() * Math.floor(900000) + 100000);
			const stringifiedOtp = otp.toString();
			const salt = await bcrypt.genSaltSync(10);
			const hashedOtp = await bcrypt.hash(stringifiedOtp, salt);
			return { hashedOtp, stringifiedOtp };
		} catch (error) {
			throw error;
		}
	}

	public static async createOtpForServer(hashedOtp: string, user_id: string) {
		try {
			const otpModel = await Otp.create({
				otp: hashedOtp,
				user_id,
				status: "active",
			});

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error) {
			throw error;
		}
	}

	public static async updateOtpForServer(
		hashedOtp: string,
		otp_user_id: string
	) {
		try {
			const otpModel = await Otp.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			if (!otpModel) {
				console.error("Otp document not found");
				throw new Error("Otp document not found");
			}

			otpModel.otp = hashedOtp;
			otpModel.status = "active";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error) {
			console.error("error updating otp");
			throw error;
		}
	}

	public static async changeOtpStatusToUsed(otp_user_id: string) {
		try {
			const otpModel = await Otp.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			otpModel.status = "used";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error: any) {
			console.error("error changing otp status to used");
			throw error;
		}
	}
	public static async changeOtpStatusToExpired(otp_user_id: string) {
		try {
			const otpModel = await Otp.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			otpModel.status = "expired";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error: any) {
			console.error("error changing otp status to expired");
			throw error;
		}
	}
}
