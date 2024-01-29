import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	mobile_number: {
		type: String,
		unique: true,
		required: true,
	},
});

const model = mongoose.model("User", UserSchema, "yoga_users");

export default model;
// module.exports = model;
