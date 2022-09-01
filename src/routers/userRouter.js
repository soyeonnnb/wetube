import express from "express";
import { edit, remove } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.use("/edit", edit);
userRouter.use("/remove", remove);

export default userRouter;
