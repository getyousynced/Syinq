import { Router } from "express";
import { findRide, offerRide } from "../controller/pool.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const poolRouter = Router();

poolRouter.post("/offer", verifyToken,offerRide);
poolRouter.post('/find', findRide);

export default poolRouter;
