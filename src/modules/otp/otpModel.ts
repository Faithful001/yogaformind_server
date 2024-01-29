import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OtpSchema = new Schema({
	otp: {
		type: String,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "active",
		enum: ["active", "used", "expired"],
	},
});

const model = mongoose.model("Otp", OtpSchema, "yoga_users_otp");

module.exports = model;
