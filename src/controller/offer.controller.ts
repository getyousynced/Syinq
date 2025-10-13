import { NextFunction, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { AuthRequest } from "../interface/auth.interace";
import { OfferRideService } from "../services/offer.service";
import { RideType } from "@prisma/client";
import { util } from "../utils/util";

export const publishRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      currentLocation,
      destinationLocation,
      timing,
      date,
      seats,
      rideType,
      vehicleNumber,
    } = req.body;
    const userId = req.user?.userId;

    // Basic validation
    if (
      !currentLocation ||
      !destinationLocation ||
      !timing ||
      !date ||
      !seats ||
      !userId ||
      !rideType
    ) {
      return next(new ErrorResponse("All fields are required", 400));
    }

    if (!Object.values(RideType).includes(rideType)) {
      return next(
        new ErrorResponse("Invalid ride type. Must be CAB, BIKE, or CAR", 400)
      );
    }

    // Validate seats is a number
    const seatsNumber = parseInt(seats);
    if (isNaN(seatsNumber)) {
      return next(new ErrorResponse("Seats must be a valid number", 400));
    }


    currentLocation.cellToken = util.getS2CellToken(
      currentLocation.latitude,
      currentLocation.longitude
    );


    destinationLocation.cellToken = util.getS2CellToken(
      destinationLocation.latitude,
      destinationLocation.longitude
    );

    const newRide = await OfferRideService.publishRide({
      userId,
      currentLocation,
      destinationLocation,
      timing,
      date,
      seats: seatsNumber,
      rideType,
      vehicleNumber: vehicleNumber ? vehicleNumber.trim() : undefined
    });

    res.status(201).json({
      success: true,
      message: "Ride published successfully",
      data: newRide,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to publish ride", 500)
    );
  }
};

export const publishRideV2 = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      currentLocation,
      destinationLocation,
      timing,
      date,
      seats,
      rideType,
      vehicleNumber,
    } = req.body;
    const userId = req.user?.userId;

    // Basic validation
    if (
      !currentLocation ||
      !destinationLocation ||
      !timing ||
      !date ||
      !seats ||
      !userId ||
      !rideType
    ) {
      return next(new ErrorResponse("All fields are required", 400));
    }

    if (!Object.values(RideType).includes(rideType)) {
      return next(
        new ErrorResponse("Invalid ride type. Must be CAB, BIKE, or CAR", 400)
      );
    }

    // Validate seats is a number
    const seatsNumber = parseInt(seats);
    if (isNaN(seatsNumber)) {
      return next(new ErrorResponse("Seats must be a valid number", 400));
    }

    const newRide = await OfferRideService.publishRide({
      userId,
      currentLocation,
      destinationLocation,
      timing,
      date,
      seats: seatsNumber,
      rideType,
      vehicleNumber: vehicleNumber ? vehicleNumber.trim() : undefined
    });

    indexRides(
      currentLocation.latitude,
      currentLocation.longitude,
      destinationLocation.latitude,
      destinationLocation.longitude,
      newRide.id
    );

    res.status(201).json({
      success: true,
      message: "Ride published successfully",
      data: newRide,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to publish ride", 500)
    );
  }
};


async function indexRides(
  srcLat: number,
  srcLng: number,
  destLat: number,
  destLng: number,
  rideId: string) {
  try {
    const nearBySrcTokens = util.nearByS2CellTokens(srcLat, srcLng, 15);
    const destCellTokens = util.nearByS2CellTokens(destLat, destLng, 15);

    const requests = [];
    for (const srcToken of nearBySrcTokens) {
      for (const destToken of destCellTokens) {
        requests.push({
          rideId,
          srcCellToken: srcToken,
          destCellToken: destToken
        });
      }
    }

    OfferRideService.indexRides(requests);
  } catch (error) {
    console.error("Error indexing ride:", error);
  }
}

export const getUserRides = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const rides = await OfferRideService.getUserRides(userId);

    res.status(200).json({
      success: true,
      data: rides,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to fetch user rides", 500)
    );
  }
};

export const getRideById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorResponse("Ride ID is required", 400));
    }

    const ride = await OfferRideService.getRideById(id);

    res.status(200).json({
      success: true,
      data: ride,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to fetch ride", 500)
    );
  }
};

export const deleteRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!id) {
      return next(new ErrorResponse("Ride ID is required", 400));
    }

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const result = await OfferRideService.deleteRide(id, userId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to delete ride", 500)
    );
  }
};

export const updateRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { currentLocation, destinationLocation, timing, date, seats, rideType, vehicleNumber } =
      req.body;
    const userId = req.user?.userId;

    if (!id) {
      return next(new ErrorResponse("Ride ID is required", 400));
    }

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    // Validate rideType if provided
    if (rideType && !Object.values(RideType).includes(rideType)) {
      return next(
        new ErrorResponse("Invalid ride type. Must be CAB, BIKE, or CAR", 400)
      );
    }

    // Check if at least one field is being updated
    if (
      !currentLocation &&
      !destinationLocation &&
      !timing &&
      !date &&
      !seats &&
      !rideType &&
      vehicleNumber === undefined
    ) {
      return next(
        new ErrorResponse("At least one field must be provided for update", 400)
      );
    }

    // Validate seats if provided
    let seatsNumber: number | undefined;
    if (seats !== undefined) {
      seatsNumber = parseInt(seats);
      if (isNaN(seatsNumber)) {
        return next(new ErrorResponse("Seats must be a valid number", 400));
      }
    }

    const updatedRide = await OfferRideService.updateRide(id, userId, {
      currentLocation,
      destinationLocation,
      timing,
      date,
      seats: seatsNumber,
      rideType,
      vehicleNumber: vehicleNumber?.trim(),
    });

    res.status(200).json({
      success: true,
      message: "Ride updated successfully",
      data: updatedRide,
    });
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      return next(error);
    }
    return next(
      new ErrorResponse(error.message || "Failed to update ride", 500)
    );
  }
};
