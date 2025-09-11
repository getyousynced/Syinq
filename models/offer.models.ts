import { CreateOfferRideData } from "../interface/offer.interface";
import { prisma } from "../server";
import ErrorResponse from "../utils/ErroResponse";
import { RideType } from "@prisma/client";

export class OfferRideModel {
  /**
   * Create a new offer ride
   */
  static async create(data: CreateOfferRideData) {
    try {
      const offerRide = await prisma.offerRide.create({
        data: {
          userId: data.userId,
          originAddress: data.originLocation.address,
          originAddressLatitude: data.originLocation.latitude,
          originAddressLongitude: data.originLocation.longitude,
          originAddressPlaceId: data.originLocation.placeId || null,
          destinationAddress: data.destinationLocation.address,
          destinationAddressLatitude: data.destinationLocation.latitude,
          destinationAddressLongitude: data.destinationLocation.longitude,
          destinationAddressPlaceId: data.destinationLocation.placeId || null,
          plannedTime: data.plannedTime,
          seats: data.seats,
          rideType: data.rideType,
          VehicleNumber: data.vehicleNumber || null,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      return offerRide;
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ErrorResponse("Duplicate entry found", 400);
      }
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Find active rides by vehicle number
   */
  static async findActiveRidesByVehicleNumber(
    vehicleNumber: string,
    excludeRideId?: string
  ) {
    try {
      const currentTime = new Date();

      const whereCondition: any = {
        VehicleNumber: vehicleNumber,
        plannedTime: {
          gte: currentTime, // Only future rides
        },
      };

      if (excludeRideId) {
        whereCondition.id = {
          not: excludeRideId,
        };
      }

      const rides = await prisma.offerRide.findMany({
        where: whereCondition,
        select: {
          id: true,
          userId: true,
          plannedTime: true,
          VehicleNumber: true,
          rideType: true,
        },
      });

      return rides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Find offer ride by ID
   */
  static async findById(id: string) {
    try {
      const offerRide = await prisma.offerRide.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      if (!offerRide) {
        return null;
      }

      return offerRide;
    } catch (error: any) {
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Find offer rides by user ID
   */
  static async findByUserId(userId: string) {
    try {
      const offerRides = await prisma.offerRide.findMany({
        where: { userId },
        orderBy: { plannedTime: "desc" },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      return offerRides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Validate user exists and get user details
   */
  static async validateUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
          collegeInfo: true,
        },
      });

      return user;
    } catch (error: any) {
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Delete offer ride
   */
  static async delete(id: string) {
    try {
      await prisma.offerRide.delete({
        where: { id },
      });

      return true;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ErrorResponse("Offer ride not found", 404);
      }
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Update offer ride
   */
  static async update(id: string, data: Partial<CreateOfferRideData>) {
    try {
      const updatePayload: any = {};

      if (data.originLocation) {
        updatePayload.originAddress = data.originLocation.address;
        updatePayload.originAddressLatitude = data.originLocation.latitude;
        updatePayload.originAddressLongitude = data.originLocation.longitude;
        updatePayload.originAddressPlaceId =
          data.originLocation.placeId || null;
      }

      if (data.destinationLocation) {
        updatePayload.destinationAddress = data.destinationLocation.address;
        updatePayload.destinationAddressLatitude =
          data.destinationLocation.latitude;
        updatePayload.destinationAddressLongitude =
          data.destinationLocation.longitude;
        updatePayload.destinationAddressPlaceId =
          data.destinationLocation.placeId || null;
      }

      if (data.plannedTime) {
        updatePayload.plannedTime = data.plannedTime;
      }

      if (data.seats !== undefined) {
        updatePayload.seats = data.seats;
      }

      // Add rideType update
      if (data.rideType) {
        updatePayload.rideType = data.rideType;
      }

      // Handle nullable vehicle number
      if (data.vehicleNumber !== undefined) {
        updatePayload.VehicleNumber = data.vehicleNumber || null;
      }

      const updatedRide = await prisma.offerRide.update({
        where: { id },
        data: updatePayload,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      return updatedRide;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ErrorResponse("Offer ride not found", 404);
      }
      if (error.code === "P2002") {
        throw new ErrorResponse("Duplicate entry found", 400);
      }
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }
}
