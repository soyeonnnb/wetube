import express from "express";
import {
  edit,
  remove,
  signup,
  see,
  logout,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/signup", signup);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
