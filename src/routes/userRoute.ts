import { UserController } from "../controller/userController";
import express from "express";

const userController = new UserController()
const userRouter = express.Router()

userRouter.post("/", userController.createUser)

export default userRouter