import express from "express";
import { home, search } from "../controllers/videoControllers";
import { join, login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/search").get(search);

globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
