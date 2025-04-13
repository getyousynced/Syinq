import { verifyToken } from "./../middlewares/auth.middleware";
import { Router } from "express";
import {
  activateUser,
  ForgotPassword,
  loggedInUser,
  loginUser,
  Logout,
  registerUser,
  ResetPassword,
  verifyOTP,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/activateUser", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/getLoggedIn", verifyToken, loggedInUser);
userRouter.post("/forgotpassword", ForgotPassword);
userRouter.post("/resetpassword", ResetPassword);
userRouter.post("/logout", Logout);
userRouter.post("/verifyOtp", verifyOTP);

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
