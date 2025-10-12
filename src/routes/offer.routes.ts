import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { deleteRide, getRideById, getUserRides, publishRide, publishRideV2, updateRide } from '../controller/offer.controller';

const offerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Offer Rides
 *   description: Publish and manage offered rides
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LocationData:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *           description: Human-readable address
 *           example: "IIT Delhi Main Gate"
 *         latitude:
 *           type: number
 *           format: float
 *           description: Latitude in decimal degrees
 *           example: 28.545
 *         longitude:
 *           type: number
 *           format: float
 *           description: Longitude in decimal degrees
 *           example: 77.192
 *         placeId:
 *           type: string
 *           nullable: true
 *           description: Optional place identifier from provider
 *           example: "ChIJL6z3..."
 *
 *     PublishRideRequest:
 *       type: object
 *       required: [currentLocation, destinationLocation, timing, date, seats, rideType]
 *       properties:
 *         currentLocation:
 *           $ref: '#/components/schemas/LocationData'
 *         destinationLocation:
 *           $ref: '#/components/schemas/LocationData'
 *         timing:
 *           type: string
 *           description: 24h time HH:mm
 *           example: "14:30"
 *         date:
 *           type: string
 *           format: date
 *           description: Ride date (YYYY-MM-DD)
 *           example: "2025-10-05"
 *         seats:
 *           type: integer
 *           minimum: 1
 *           maximum: 6
 *           description: Number of available seats
 *           example: 3
 *         rideType:
 *           type: string
 *           enum: [CAB, BIKE, CAR]
 *           description: Type of ride offered
 *           example: "CAR"
 *         vehicleNumber:
 *           type: string
 *           nullable: true
 *           description: Vehicle registration number (if applicable)
 *           example: "DL01AB1234"
 *
 *     UpdateRideRequest:
 *       type: object
 *       properties:
 *         currentLocation:
 *           $ref: '#/components/schemas/LocationData'
 *         destinationLocation:
 *           $ref: '#/components/schemas/LocationData'
 *         timing:
 *           type: string
 *           description: 24h time HH:mm
 *           example: "16:00"
 *         date:
 *           type: string
 *           format: date
 *           description: Ride date (YYYY-MM-DD)
 *           example: "2025-10-06"
 *         seats:
 *           type: integer
 *           minimum: 1
 *           maximum: 6
 *           description: Number of available seats
 *           example: 2
 *         rideType:
 *           type: string
 *           enum: [CAB, BIKE, CAR]
 *           description: Type of ride offered
 *           example: "BIKE"
 *         vehicleNumber:
 *           type: string
 *           nullable: true
 *           description: Vehicle registration number (if applicable)
 *           example: "DL05C1234"
 *
 *     OfferRide:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Ride ID
 *           example: "ride_123"
 *         userId:
 *           type: string
 *           description: ID of the ride owner
 *           example: "64f9b8c8e1234567890abcde"
 *         originAddress:
 *           type: string
 *           example: "IIT Delhi Main Gate"
 *         originAddressLatitude:
 *           type: number
 *           example: 28.545
 *         originAddressLongitude:
 *           type: number
 *           example: 77.192
 *         originAddressPlaceId:
 *           type: string
 *           nullable: true
 *         destinationAddress:
 *           type: string
 *           example: "Connaught Place"
 *         destinationAddressLatitude:
 *           type: number
 *           example: 28.632
 *         destinationAddressLongitude:
 *           type: number
 *           example: 77.219
 *         destinationAddressPlaceId:
 *           type: string
 *           nullable: true
 *         plannedTime:
 *           type: string
 *           format: date-time
 *           example: "2025-10-05T14:30:00.000Z"
 *         seats:
 *           type: integer
 *           example: 3
 *         rideType:
 *           type: string
 *           enum: [CAB, BIKE, CAR]
 *         vehicleNumber:
 *           type: string
 *           nullable: true
 *           example: "DL01AB1234"
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             profile:
 *               type: object
 *               properties:
 *                 name: { type: string }
 *                 phoneNumber: { type: string }
 *                 profileImage: { type: string, nullable: true }
 *                 gender: { type: string, nullable: true }
 *                 carNumber: { type: string, nullable: true }
 *                 bikeNumber: { type: string, nullable: true }
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

// Protect all routes with authentication
offerRouter.use(verifyToken);

/**
 * @swagger
 * /api/v1/offer/publish:
 *   post:
 *     tags: [Offer Rides]
 *     summary: Publish a new ride
 *     description: Publish an upcoming ride after validating locations, time, seats, and vehicle details. Returns the created ride with user info.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublishRideRequest'
 *           examples:
 *             sample:
 *               summary: Example payload
 *               value:
 *                 currentLocation:
 *                   address: "IIT Delhi Main Gate"
 *                   latitude: 28.545
 *                   longitude: 77.192
 *                   placeId: "ChIJL6z3..."
 *                 destinationLocation:
 *                   address: "Connaught Place"
 *                   latitude: 28.632
 *                   longitude: 77.219
 *                 timing: "14:30"
 *                 date: "2025-10-05"
 *                 seats: 3
 *                 rideType: "CAR"
 *                 vehicleNumber: "DL01AB1234"
 *     responses:
 *       201:
 *         description: Ride published successfully
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
 *                   example: "Ride published successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OfferRide'
 *       400:
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Account not activated or suspended
 *       409:
 *         description: Conflict - Duplicate or overlapping ride
 *       500:
 *         description: Internal server error
 */
offerRouter.post('/publish', publishRide);
offerRouter.post('/publish/v2', publishRideV2);

/**
 * @swagger
 * /api/v1/offer/my-rides:
 *   get:
 *     tags: [Offer Rides]
 *     summary: Get rides published by the authenticated user
 *     description: Retrieve all rides created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rides retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OfferRide'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
offerRouter.get('/my-rides', getUserRides);

/**
 * @swagger
 * /api/v1/offer/{id}:
 *   get:
 *     tags: [Offer Rides]
 *     summary: Get a ride by ID
 *     description: Retrieve a single ride by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OfferRide'
 *       400:
 *         description: Bad request - Invalid ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags: [Offer Rides]
 *     summary: Update a ride
 *     description: Update locations, date/time, seats, ride type, or vehicle number for an existing ride
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRideRequest'
 *           examples:
 *             updateTimeAndSeats:
 *               summary: Update planned time and seats
 *               value:
 *                 date: "2025-10-06"
 *                 timing: "16:00"
 *                 seats: 2
 *     responses:
 *       200:
 *         description: Ride updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Ride updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OfferRide'
 *       400:
 *         description: Bad request - Validation errors
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Not the owner of the ride
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags: [Offer Rides]
 *     summary: Delete a ride
 *     description: Permanently delete a future ride owned by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride deleted successfully
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
 *                   example: "Ride deleted successfully"
 *       400:
 *         description: Bad request - Invalid ID or ride already started
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Not the owner of the ride
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 */
offerRouter.get('/:id', getRideById);
offerRouter.put('/:id', updateRide);
offerRouter.delete('/:id', deleteRide);

export default offerRouter;
