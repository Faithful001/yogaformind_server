import express from "express";
import { UserController } from "./userController";

const userRouter = express.Router();

userRouter.post("/signup", UserController.signupUser);
userRouter.post("/login", UserController.loginUser);

export default userRouter;
