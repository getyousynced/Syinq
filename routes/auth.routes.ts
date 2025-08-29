import { verifyToken } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
  authenticateByEmail,
  verifyOtp,
} from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/authenticateUser", authenticateByEmail);
authRouter.post('/verifyUser', verifyOtp)
// authRouter.post("/activateUser", activateUser);
// authRouter.post("/login", loginUser);
// authRouter.get("/getLoggedIn", verifyToken, loggedInUser);
// authRouter.post("/forgotpassword", ForgotPassword);
// authRouter.put("/resetpassword", ResetPassword);
// authRouter.post("/logout", Logout);
// // To verify otp for reset password
// authRouter.post("/verifyOtp", verifyOTP);
// authRouter.patch("/updateUser", updateProfile);
// authRouter.post("/resendVeriifcationOtp", resendVerificationOTP);
// authRouter.post("/resendForgotPasswordOtp", resendForgotPasswordOTP);

/*
Register - done
Login - done
ActivateUser - done
LoggedInUser - done
FogretPassword - done
ResetPassword - done
Logout - 
 */

export default authRouter;
