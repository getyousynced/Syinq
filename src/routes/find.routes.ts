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
 * @swagger
 * tags:
 *   name: Find
 *   description: Ride discovery and search endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - address
 *         - latitude
 *         - longitude
 *       properties:
 *         address:
 *           type: string
 *           description: "Human-readable address"
 *           example: "Saket Metro Station, New Delhi"
 *         latitude:
 *           type: number
 *           format: float
 *           description: "Latitude in decimal degrees"
 *           example: 28.5273
 *         longitude:
 *           type: number
 *           format: float
 *           description: "Longitude in decimal degrees"
 *           example: 77.2194
 *
 *     SearchRidesRequest:
 *       type: object
 *       required:
 *         - originLocation
 *         - destinationLocation
 *       properties:
 *         originLocation:
 *           $ref: '#/components/schemas/Location'
 *         destinationLocation:
 *           $ref: '#/components/schemas/Location'
 *         date:
 *           type: string
 *           format: date-time
 *           description: "Optional date/time of ride"
 *           example: "2025-10-20T09:00:00Z"
 *         seats:
 *           type: integer
 *           description: "Minimum number of seats required"
 *           example: 2
 *         rideType:
 *           type: string
 *           enum: [CAB, BIKE, CAR]
 *           description: "Type of ride requested"
 *           example: "CAR"
 *         originRadius:
 *           type: number
 *           description: "Search radius in km for origin location"
 *           default: 2.0
 *         destinationRadius:
 *           type: number
 *           description: "Search radius in km for destination location"
 *           default: 2.0
 *         maxRadius:
 *           type: number
 *           description: "Maximum allowed search radius"
 *           default: 5.0
 *
 *     NearbyRidesResponseItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         originAddress:
 *           type: string
 *         distance:
 *           type: number
 *           description: "Distance in kilometers from queried location"
 *
 *     PopularRoute:
 *       type: object
 *       properties:
 *         origin:
 *           type: string
 *           example: "Connaught Place, New Delhi"
 *         destination:
 *           type: string
 *           example: "Noida Sector 62"
 *         count:
 *           type: integer
 *           example: 35
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Validation error"
 */

/**
 * @swagger
 * /api/v1/find/search:
 *   post:
 *     tags: [Find]
 *     summary: Search rides using S2 cell tokens
 *     description: Search rides by origin and destination with location radius filtering. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Ride search parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchRidesRequest'
 *     responses:
 *       200:
 *         description: Matching rides found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Found 3 matching rides"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rides:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NearbyRidesResponseItem'
 *                     searchCriteria:
 *                       type: object
 *                       properties:
 *                         origin:
 *                           type: string
 *                         destination:
 *                           type: string
 *                         originRadius:
 *                           type: number
 *                         destinationRadius:
 *                           type: number
 *                         date:
 *                           type: string
 *                         minSeats:
 *                           type: string
 *                         rideType:
 *                           type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

/**
 * @swagger
 * /api/v1/find/search-all:
 *   post:
 *     tags: [Find]
 *     summary: Search rides with progressive radius expansion
 *     description: Search rides progressively expanding origin/destination radius to find matches. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Search parameters with radius options
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchRidesRequest'
 *     responses:
 *       200:
 *         description: Matching rides found
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/find/nearby:
 *   get:
 *     tags: [Find]
 *     summary: Get rides near a given location
 *     description: Returns rides starting near the given latitude/longitude within a specified radius.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of location
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of location
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *           default: 5
 *         description: Search radius in km (1-10)
 *     responses:
 *       200:
 *         description: Nearby rides found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NearbyRidesResponseItem'
 *       400:
 *         description: Validation or parameter error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/find/popular-routes:
 *   get:
 *     tags: [Find]
 *     summary: Get popular routes
 *     description: Returns list of popular routes based on ride frequency.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Popular routes retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Popular routes retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PopularRoute'
 *       401:
 *         description: Unauthorized
 */

// Route definitions
findRouter.post("/search", verifyToken, searchRides);
findRouter.get("/nearby", verifyToken, getNearbyRides);
findRouter.get("/popular-routes", verifyToken, getPopularRoutes);
findRouter.get("/search-all", verifyToken, searchAllRides);

export default findRouter;
