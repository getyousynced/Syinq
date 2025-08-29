import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getProfile, updateUserProfile } from "../controller/user.controller";

const userRouter = Router();

userRouter.put("/profile", verifyToken, updateUserProfile);
userRouter.get('/profile', verifyToken, getProfile);

export default userRouter