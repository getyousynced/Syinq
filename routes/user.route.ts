import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { validateUpdateProfile } from "../middlewares/validation";
import { getProfile, updateUserProfile } from "../controller/user.controller";

const userRouter = Router();

userRouter.put("/profile", verifyToken, validateUpdateProfile, updateUserProfile);
userRouter.get('/profile', verifyToken, getProfile);

export default userRouter