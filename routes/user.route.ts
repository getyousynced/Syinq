import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { deleteUserProfile, getProfile, updateUserProfile } from "../controller/user.controller";

const userRouter = Router();

userRouter.put("/profile", verifyToken, updateUserProfile);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.delete("/delete", verifyToken, deleteUserProfile);

export default userRouter;
