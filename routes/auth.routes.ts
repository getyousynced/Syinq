import { verifyToken } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
  authenticateByEmail,
  logout,
  verifyOtp,
} from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/authenticateUser", authenticateByEmail);
authRouter.post('/verifyUser', verifyOtp)
authRouter.post("/logout", verifyToken, logout);


export default authRouter;
