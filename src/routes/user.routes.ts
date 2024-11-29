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
} from "../controller/user.controller.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/activateUser", activateUser);
router.post("/login", loginUser);
router.get("/getLoggedIn", verifyToken, loggedInUser);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword", ResetPassword);
router.post('/logout', Logout);

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
