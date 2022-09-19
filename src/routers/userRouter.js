import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  edit,
  remove,
  see,
  logout,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
