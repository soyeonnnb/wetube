import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  remove,
  see,
  logout,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
