import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  seeProfile,
  remove,
  see,
} from "../controllers/userControllers";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.all(protectorMiddleware).get("/profile", seeProfile);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/remove", protectorMiddleware, remove);
userRouter.get("/:id", see);

export default userRouter;
