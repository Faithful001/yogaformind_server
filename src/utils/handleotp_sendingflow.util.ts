import { OtpMethods } from "./otp.util";
import Otp from "../modules/otp/otpModel";
import { SendOtpToUser } from "./send_otp_to_user.util";

export async function handleOtpSendingFlow(userExists: any) {
	const { stringifiedOtp, hashedOtp } = await OtpMethods.createOTPForClient();

	const OtpExists = Otp.findOne({ user_id: userExists._id });
	if (OtpExists) {
		await OtpMethods.updateOtpForServer(hashedOtp, userExists._id.toString());
	} else {
		await OtpMethods.createOtpForServer(hashedOtp, userExists._id.toString());
	}

	await SendOtpToUser.sendOtpSMSToUser(
		userExists.mobile_number,
		stringifiedOtp
	);

	await OtpMethods.changeOtpStatusToUsed(userExists._id.toString());
	const thirthyMinutes = 1800;
	setTimeout(() => {
		OtpMethods.changeOtpStatusToExpired(userExists._id.toString());
	}, thirthyMinutes);

	return hashedOtp;
}
