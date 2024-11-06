import { Router } from "express";
import { loginUser } from "../controller/user.controller.ts"

const router = Router();


router.route("/login").post(loginUser)
export default router;
