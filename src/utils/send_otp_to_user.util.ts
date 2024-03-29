import { config } from "dotenv";
import { OtpController } from "../modules/otp/otpController";
config();

export class SendOtpToUser {
	public static async sendOtpSMSToUser(
		mobile_number: string,
		stringifiedOtp: string
	) {
		try {
			const accountSid = process.env.TWILIO_ACCOUNT_SID;
			const authToken = process.env.TWILIO_AUTH_TOKEN;
			const client = require("twilio")(accountSid, authToken);

			const response = await client.messages.create({
				body: `This is the your one-time-password: ${stringifiedOtp}. Please do not share.`,
				from: "+12722362822",
				to: mobile_number,
			});

			console.log("Message sent successfully", response.sid);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	}
}
