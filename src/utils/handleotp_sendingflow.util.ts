import { OtpMethods } from "./otp.util";
import Otp from "../modules/otp/otpModel";
import { SendOtpToUser } from "./send_otp_to_user.util";

export async function handleOtpSendingFlow(userExists: any) {
	const { stringifiedOtp, hashedOtp } = await OtpMethods.createOTPForClient();

	(await Otp.findOne({ user_id: userExists?._id }))
		? await OtpMethods.updateOtpForServer(hashedOtp, userExists._id)
		: await OtpMethods.createOtpForServer(hashedOtp, userExists._id);

	// await SendOtpToUser.sendOtpSMSToUser(
	// 	userExists.mobile_number,
	// 	stringifiedOtp
	// );

	const thirthyMinutes = 1800000;
	setTimeout(() => {
		OtpMethods.changeOtpStatusToExpired(userExists._id);
	}, thirthyMinutes);

	return stringifiedOtp;
}
