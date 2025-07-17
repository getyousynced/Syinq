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
  ypeOfRide: "Cab" | "Self";
  carId?: String; // only for "Self"
  askForFair: boolean;
  amount: number;
}

const offerRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      originAddressId,
      destinationAddressId,
      typeOfRide,
      carId,
      askForFair,
      amount,
    } = req.body;

    if (!userId || !originAddressId || !destinationAddressId || !typeOfRide) {
      return next(new ErrorResponse("Missing required fields.", 400));
    }

    if (typeOfRide === "Self" && !carId) {
      return next(
        new ErrorResponse("carId is required for typeOfRide = Self.", 400)
      );
    }

    console.log("originAddressId:", originAddressId);
    const originAddressRecord = await prisma.address.findUnique({
      where: { addressId: originAddressId },
    });

    if (!originAddressRecord) {
      return next(
        new ErrorResponse(
          "Origin address not found. Please ensure the address exists.",
          404
        )
      );
    }

    try {
      const offerRide = await prisma.offerRide.create({
        data: {
          user: { connect: { id: userId } },
          originAddress: { connect: { addressId: originAddressId } },
          destinationAddress: { connect: { addressId: destinationAddressId } },
          askForFair: askForFair ?? false,
          amount: askForFair ? amount : 0,
          typeOfRide: typeOfRide,
          ...(typeOfRide === "Self" && carId
            ? { car: { connect: { carId } } }
            : {}),
        },
      });

      res.status(201).json({
        success: true,
        message: "Ride Created Successfully",
        rideDetails: offerRide,
      });
    } catch (error) {
      // console.log(error.message);

      return next(new ErrorResponse("Something went wrong!", 400));
    }
  } catch (error) {
    return next(error);
  }
};

const findRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export { findRide, offerRide };
