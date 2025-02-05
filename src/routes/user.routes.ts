import { verifyToken } from "./../middlewares/auth.middleware.ts";
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
} from "../controller/user.controller.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/activateUser", activateUser);
router.post("/login", loginUser);
router.get("/getLoggedIn", verifyToken, loggedInUser);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword", ResetPassword);
router.post("/logout", Logout);
router.post("/verifyOtp", verifyOTP);

/*
Register - done
Login - done
ActivateUser - done
LoggedInUser - done
FogretPassword - done
ResetPassword - done
Logout - 
 */

export default router;
