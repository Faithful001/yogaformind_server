import express from "express";
import { UserController } from "./userController";

const router = express.Router();

router.post("/signup", UserController.signupUser);
