import express from "express";

const videoRouter = express.Router();

const HandleWatch = (req, res) => res.send("Watch Video");
const handleEdit = (req, res) => res.send("Edit Video");

videoRouter.use("/watch", HandleWatch);
videoRouter.use("/edit", handleEdit);

export default videoRouter;