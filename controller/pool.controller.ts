import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { prisma } from "../server";

interface FindRideInput {
  originAddressId: string;
  stopId: string;
  dateTime: string;
  seat_capacity: number;
}

interface OfferRideInput {
  originAddressId: String;
  destinationAddressId: String;
  typeOfRide: "Cab" | "Self";
  carId?: String; // only for "Self"
  askForFair: boolean;
  amount: number;
}

const offerRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = "12345sdjhsdj";

    if (!userId) {
      return next(new ErrorResponse("User Id not present", 404));
    }

    const {
      originAddress,
      originAddressLatitude,
      originAddressLongitude,
      originAddressPlaceId,
      plannedTime,
      destinationAddress,
      destinationAddressLatitude,
      destinationAddressLongitude,
      destinationAddressPlaceId,
    } = req.body;

    if (
      !originAddress ||
      originAddressLatitude === undefined ||
      originAddressLatitude === null ||
      originAddressLongitude === undefined ||
      originAddressLongitude === null ||
      !originAddressPlaceId ||
      !plannedTime ||
      !destinationAddress ||
      destinationAddressLatitude === undefined ||
      destinationAddressLatitude === null ||
      destinationAddressLongitude === undefined ||
      destinationAddressLongitude === null ||
      !destinationAddressPlaceId
    ) {
      return next(new ErrorResponse("Missing required fields.", 400));
    }

    if (isNaN(Date.parse(plannedTime))) {
      return next(new ErrorResponse("Invalid plannedTime format", 400));
    }

    try {
      const offerRide = await prisma.offerRide.create({
        data: {
          userId: userId,
          originAddress,
          originAddressLatitude,
          originAddressLongitude,
          originAddressPlaceId,
          plannedTime: new Date(plannedTime),
          destinationAddress,
          destinationAddressLatitude,
          destinationAddressLongitude,
          destinationAddressPlaceId,
        },
      });

      res.status(201).json({
        success: true,
        message: "Ride Created Successfully",
        rideDetails: offerRide,
      });
    } catch (error) {
      return next(new ErrorResponse(`Something went wrong!: ${error.message}`, 400));
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const findRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      originAddress,
      originAddressLatitude,
      originAddressLongitude,
      originAddressPlaceId,
      destinationAddress,
      destinationAddressLatitude,
      destinationAddressLongitude,
      destinationAddressPlaceId,
    } = req.body;

    if (
      !originAddress ||
      originAddressLatitude === undefined ||
      originAddressLatitude === null ||
      originAddressLongitude === undefined ||
      originAddressLongitude === null ||
      !originAddressPlaceId ||
      !destinationAddress ||
      destinationAddressLatitude === undefined ||
      destinationAddressLatitude === null ||
      destinationAddressLongitude === undefined ||
      destinationAddressLongitude === null ||
      !destinationAddressPlaceId
    ) {
      return next(new ErrorResponse("Missing required fields.", 400));
    }

    const SEARCH_RADIUS_KM = 5;

    // fetch all active offer rides
    try {
      const offerdRides = await prisma.offerRide.findMany();

      // Filter rides based on proximity only
      const matchedRides = offerdRides.filter((ride) => {
        const originDist = getDistanceFromLatLonInKm(
          originAddressLatitude,
          originAddressLongitude,
          ride.originAddressLatitude,
          ride.originAddressLongitude
        );

        const destDist = getDistanceFromLatLonInKm(
          destinationAddressLatitude,
          destinationAddressLongitude,
          ride.destinationAddressLatitude,
          ride.destinationAddressLongitude
        );

        return originDist <= SEARCH_RADIUS_KM && destDist <= SEARCH_RADIUS_KM;
      });

      res.status(200).json({
        success: true,
        message: "Rides Featched",
        count: matchedRides.length,
        rides: matchedRides,
      });
    } catch (error) {
      return next(new ErrorResponse("Something Went Wrong!", 500));
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export { findRide, offerRide };
