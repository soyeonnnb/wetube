import express from "express";
import { home, search } from "../controllers/videoControllers";
import { getJoin, postJoin, login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/search").get(search);

globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/login", login);

export default globalRouter;
