import { NextFunction, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { AuthRequest } from "../interface/auth.interace";
import { RideType } from "@prisma/client";
import { FindRideService } from "../services/find.service";
import { util } from "../utils/util";

export const searchRides = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      originLocation,
      destinationLocation,
      date,
      seats,
      rideType,
      originRadius = 2.0,      // Default 2km radius for origin
      destinationRadius = 2.0, // Default 2km radius for destination
      maxRadius = 5.0          // Maximum allowed radius
    } = req.body;
    
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    // Basic validation
    if (!originLocation || !destinationLocation) {
      return next(new ErrorResponse("Origin and destination locations are required", 400));
    }

    // Validate location data
    if (!originLocation.address || !originLocation.latitude || !originLocation.longitude) {
      return next(new ErrorResponse("Origin location must include address, latitude, and longitude", 400));
    }

    if (!destinationLocation.address || !destinationLocation.latitude || !destinationLocation.longitude) {
      return next(new ErrorResponse("Destination location must include address, latitude, and longitude", 400));
    }

    // Validate coordinates
    if (Math.abs(originLocation.latitude) > 90 || Math.abs(originLocation.longitude) > 180) {
      return next(new ErrorResponse("Invalid origin coordinates", 400));
    }

    if (Math.abs(destinationLocation.latitude) > 90 || Math.abs(destinationLocation.longitude) > 180) {
      return next(new ErrorResponse("Invalid destination coordinates", 400));
    }

    // Validate radius parameters
    const originRadiusNum = parseFloat(originRadius);
    const destinationRadiusNum = parseFloat(destinationRadius);
    const maxRadiusNum = parseFloat(maxRadius);

    // Validate optional parameters
    if (seats && (isNaN(parseInt(seats)) || parseInt(seats) < 1)) {
      return next(new ErrorResponse("Seats must be a positive number", 400));
    }

    if (rideType && !Object.values(RideType).includes(rideType)) {
      return next(new ErrorResponse("Invalid ride type. Must be CAB, BIKE, or CAR", 400));
    }

    // Validate date format if provided
    if (date && isNaN(new Date(date).getTime())) {
      return next(new ErrorResponse("Invalid date format", 400));
    }

    const searchRequest = {
      userId,
      originLocation,
      destinationLocation,
      date,
      seats: seats ? parseInt(seats) : undefined,
      rideType,
      originRadius: originRadiusNum,
      destinationRadius: destinationRadiusNum,
      maxRadius: maxRadiusNum,
      srcCellTokens: [] as string[], // Add empty array or compute tokens based on originLocation
      destCellTokens: [] as string[] // Add empty array or compute tokens based on destinationLocation
    };

    searchRequest.srcCellTokens = util.nearByS2CellTokens(
      originLocation.latitude,
      originLocation.longitude,
      originRadiusNum
    );

    searchRequest.destCellTokens = util.nearByS2CellTokens(
      destinationLocation.latitude,
      destinationLocation.longitude,
      destinationRadiusNum
    );

    const searchResults = await FindRideService.serchRidesWithSrcDestCellToken(searchRequest);

    res.status(200).json({
      success: true,
      message: `Found ${searchResults.length} matching rides`,
      data: {
        rides: searchResults,
        searchCriteria: {
          origin: originLocation.address,
          destination: destinationLocation.address,
          originRadius: originRadiusNum,
          destinationRadius: destinationRadiusNum,
          date: date || "Any date",
          minSeats: seats || "Any",
          rideType: rideType || "Any"
        }
      }
    });

  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(new ErrorResponse(error.message || "Failed to search rides", 500));
  }
};

export const searchAllRides = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      originLocation,
      destinationLocation,
      date,
      seats,
      rideType,
      originRadius = 2.0,      // Default 2km radius for origin
      destinationRadius = 2.0, // Default 2km radius for destination
      maxRadius = 5.0          // Maximum allowed radius
    } = req.body;
    
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    // Basic validation
    if (!originLocation || !destinationLocation) {
      return next(new ErrorResponse("Origin and destination locations are required", 400));
    }

    // Validate location data
    if (!originLocation.address || !originLocation.latitude || !originLocation.longitude) {
      return next(new ErrorResponse("Origin location must include address, latitude, and longitude", 400));
    }

    if (!destinationLocation.address || !destinationLocation.latitude || !destinationLocation.longitude) {
      return next(new ErrorResponse("Destination location must include address, latitude, and longitude", 400));
    }

    // Validate coordinates
    if (Math.abs(originLocation.latitude) > 90 || Math.abs(originLocation.longitude) > 180) {
      return next(new ErrorResponse("Invalid origin coordinates", 400));
    }

    if (Math.abs(destinationLocation.latitude) > 90 || Math.abs(destinationLocation.longitude) > 180) {
      return next(new ErrorResponse("Invalid destination coordinates", 400));
    }

    // Validate radius parameters
    const originRadiusNum = parseFloat(originRadius);
    const destinationRadiusNum = parseFloat(destinationRadius);
    const maxRadiusNum = parseFloat(maxRadius);

    // Validate optional parameters
    if (seats && (isNaN(parseInt(seats)) || parseInt(seats) < 1)) {
      return next(new ErrorResponse("Seats must be a positive number", 400));
    }

    if (rideType && !Object.values(RideType).includes(rideType)) {
      return next(new ErrorResponse("Invalid ride type. Must be CAB, BIKE, or CAR", 400));
    }

    // Validate date format if provided
    if (date && isNaN(new Date(date).getTime())) {
      return next(new ErrorResponse("Invalid date format", 400));
    }

    const searchRequest = {
      userId,
      originLocation,
      destinationLocation,
      date,
      seats: seats ? parseInt(seats) : undefined,
      rideType,
      originRadius: originRadiusNum,
      destinationRadius: destinationRadiusNum,
      maxRadius: maxRadiusNum
    };

    const searchResults = await FindRideService.searchRidesWithRadius(searchRequest);

    res.status(200).json({
      success: true,
      message: `Found ${searchResults.length} matching rides`,
      data: {
        rides: searchResults,
        searchCriteria: {
          origin: originLocation.address,
          destination: destinationLocation.address,
          originRadius: originRadiusNum,
          destinationRadius: destinationRadiusNum,
          date: date || "Any date",
          minSeats: seats || "Any",
          rideType: rideType || "Any"
        }
      }
    });

  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(new ErrorResponse(error.message || "Failed to search rides", 500));
  }
};

export const getNearbyRides = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { latitude, longitude, radius = 5 } = req.query;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    if (!latitude || !longitude) {
      return next(new ErrorResponse("Latitude and longitude are required", 400));
    }

    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const radiusKm = parseFloat(radius as string);

    if (isNaN(lat) || isNaN(lng) || isNaN(radiusKm)) {
      return next(new ErrorResponse("Invalid coordinates or radius", 400));
    }

    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return next(new ErrorResponse("Invalid coordinates", 400));
    }

    if (radiusKm < 1 || radiusKm > 10) {
      return next(new ErrorResponse("Radius must be between 1 and 10 km", 400));
    }

    const nearbyRides = await FindRideService.getNearbyRides(userId, lat, lng, radiusKm);

    res.status(200).json({
      success: true,
      message: `Found ${nearbyRides.length} nearby rides`,
      data: nearbyRides
    });

  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(new ErrorResponse(error.message || "Failed to get nearby rides", 500));
  }
};

export const getPopularRoutes = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const popularRoutes = await FindRideService.getPopularRoutes();

    res.status(200).json({
      success: true,
      message: "Popular routes retrieved successfully",
      data: popularRoutes
    });

  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(new ErrorResponse(error.message || "Failed to get popular routes", 500));
  }
};
