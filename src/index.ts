import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.config";
import userRoute from "./modules/user/userRoute";
import { config } from "dotenv";
config();

const app = express();

const corsOptions = {
	origin: ["http://localhost:5173"],
	method: ["GET", "POST", "PATCH", "DELETE"],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth/", userRoute);

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
