import { Router } from "express";
import {
  searchRides,
  getNearbyRides,
  getPopularRoutes,
  searchAllRides,
} from "../controller/find.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const findRouter = Router();

/**
 * @route   POST /api/find-ride/search
 * @desc    Search for available rides based on criteria
 * @access  Private (requires authentication)
 * @body    {
 *   originLocation: { address: string, latitude: number, longitude: number, placeId?: string },
 *   destinationLocation: { address: string, latitude: number, longitude: number, placeId?: string },
 *   date?: string (YYYY-MM-DD format, optional),
 *   seats?: number (minimum seats required, optional),
 *   rideType?: "CAB" | "BIKE" | "CAR" (optional),
 *   maxDistance?: number (maximum distance in km from search points, optional, default: 2.0)
 * }
 * @response {
 *   success: boolean,
 *   message: string,
 *   data: {
 *     rides: Array<RideDetails>,
 *     searchCriteria: SearchCriteriaUsed
 *   }
 * }
 */
findRouter.post("/search", verifyToken, searchRides);

/**
 * @route   GET /api/find-ride/nearby
 * @desc    Get nearby rides based on user's current location
 * @access  Private (requires authentication)
 * @query   {
 *   latitude: number (required),
 *   longitude: number (required),
 *   radius?: number (search radius in km, optional, default: 5)
 * }
 * @response {
 *   success: boolean,
 *   message: string,
 *   data: Array<RideDetails>
 * }
 */
findRouter.get("/nearby", verifyToken, getNearbyRides);

/**
 * @route   GET /api/find-ride/popular-routes
 * @desc    Get popular/frequently traveled routes
 * @access  Private (requires authentication)
 * @response {
 *   success: boolean,
 *   message: string,
 *   data: Array<PopularRouteData>
 * }
 */
findRouter.get("/popular-routes", verifyToken, getPopularRoutes);

findRouter.get("/search-all", verifyToken, searchAllRides);

export default findRouter;
