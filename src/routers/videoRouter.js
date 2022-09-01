import express from "express";
import { watch, edit } from "../controllers/videoControllers.js";

const videoRouter = express.Router();

videoRouter.use("/watch", watch);
videoRouter.use("/edit", edit);

export default videoRouter;
