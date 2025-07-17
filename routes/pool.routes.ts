import { Router } from "express";
import { offerRide } from "../controller/pool.controller";

const poolRouter = Router();

poolRouter.post("/offer", offerRide);

export default poolRouter;
