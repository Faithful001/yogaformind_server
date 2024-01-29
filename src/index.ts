import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/db.config";
config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

connectToDB(`server running on port ${PORT}`)
	.then((response: string) => {
		app.listen(PORT, () => {
			console.log(response);
		});
	})
	.catch((error: any) => {
		console.error(error);
	});
