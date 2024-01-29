import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function connectToDB(successMessage: string) {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		return successMessage;
	} catch (error: any) {
		console.error(error);
		throw error;
	}
}
