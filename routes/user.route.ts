import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  addCollegeEmail,
  deleteUserProfile,
  getCollegeEmail,
  getProfile,
  updateUserProfile,
  verifyOtp,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.put("/profile", verifyToken, updateUserProfile);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.delete("/delete", verifyToken, deleteUserProfile);
userRouter.patch("/addCollegeEmail", verifyToken, addCollegeEmail);
userRouter.patch("/verifyEmail", verifyToken, verifyOtp);
userRouter.get("/getEmail", verifyToken, getCollegeEmail);

export default userRouter;
