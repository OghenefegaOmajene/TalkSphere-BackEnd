// import { UserController } from "../controller/userController";
// import express from "express";

// const userController = new UserController()
// const userRouter = express.Router()

// userRouter.post("/", userController.createUser)
// userRouter.post("/login", userController.loginUser);


// export default userRouter


import express from "express";
import { UserController } from "../controller/userController";

const userController = new UserController();
const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;

