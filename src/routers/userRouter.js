import express from "express";

const userRouter = express.Router();

const handleEdit = (req, res) => res.send("Edit User");
const handleDelete = (req, res) => res.send("Delete User");

userRouter.use("/edit", handleEdit);
userRouter.use("/delete", handleDelete);

export default userRouter;