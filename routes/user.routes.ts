import { verifyToken } from "./../middlewares/auth.middleware";
import { Router } from "express";
import {
  activateUser,
  ForgotPassword,
  loggedInUser,
  loginUser,
  Logout,
  registerUser,
  resendForgotPasswordOTP,
  resendVerificationOTP,
  ResetPassword,
  updateProfile,
  verifyOTP,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/activateUser", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/getLoggedIn", verifyToken, loggedInUser);
userRouter.post("/forgotpassword", ForgotPassword);
userRouter.put("/resetpassword", ResetPassword);
userRouter.post("/logout", Logout);
// To verify otp for reset password
userRouter.post("/verifyOtp", verifyOTP);
userRouter.patch("/updateUser", updateProfile);
userRouter.post("/resendVeriifcationOtp", resendVerificationOTP);
userRouter.post("/resendForgotPasswordOtp", resendForgotPasswordOTP);

/*
Register - done
Login - done
ActivateUser - done
LoggedInUser - done
FogretPassword - done
ResetPassword - done
Logout - 
 */

export default userRouter;
