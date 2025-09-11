import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { deleteRide, getRideById, getUserRides, publishRide, updateRide } from '../controller/offer.controller';

const offerRouter = express.Router();

// Protect all routes with authentication
offerRouter.use(verifyToken);

// POST /api/rides/publish
offerRouter.post('/publish', publishRide);

// GET /api/rides/my-rides
offerRouter.get('/my-rides', getUserRides);

// GET /api/rides/:id
offerRouter.get('/:id', getRideById);

// PUT /api/rides/:id
offerRouter.put('/:id', updateRide);

// DELETE /api/rides/:id
offerRouter.delete('/:id', deleteRide);

export default offerRouter;
