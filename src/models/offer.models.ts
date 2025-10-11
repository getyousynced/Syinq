import { CreateOfferRideData, IndexRideRequest } from "../interface/offer.interface";
import { prisma } from "../server";
import ErrorResponse from "../utils/ErroResponse";
import { RideType } from "@prisma/client";

export class OfferRideModel {
  /**
   * Create a new offer ride
   */
  static async create(data: CreateOfferRideData) {
    try {
      const offerRide = await prisma.ride.create({
        data: {
          userId: data.userId,
          originAddress: data.originLocation.address,
          originCellToken: data.originLocation.cellID,
          originAddressLatitude: data.originLocation.latitude,
          originAddressLongitude: data.originLocation.longitude,
          originAddressPlaceId: data.originLocation.placeId || null,
          destinationAddress: data.destinationLocation.address,
          destinationCellToken: data.destinationLocation.cellID,
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
                  carNumber: true,
                  bikeNumber: true,
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
   * index rides for geo queries
   */
  static async indexRides(data: IndexRideRequest[]) {
    try {
      await prisma.rideIndex.createMany({
        data: data.map(item => ({
          rideId: item.rideId,
          srcCellToken: item.srcCellToken,
          destCellToken: item.destCellToken,
        }))
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        // Prisma duplicate key error — can safely ignore if skipDuplicates is not supported
        return;
      }
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Check if vehicle number is already registered to another user
   */
  static async checkVehicleNumberOwnership(
    vehicleNumber: string,
    rideType: RideType,
    currentUserId: string
  ) {
    try {
      const field = rideType === RideType.CAR ? "carNumber" : "bikeNumber";

      const existingUser = await prisma.userProfile.findFirst({
        where: {
          [field]: vehicleNumber,
          userId: {
            not: currentUserId, // Exclude current user
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return existingUser;
    } catch (error: any) {
      throw new ErrorResponse(`Database error: ${error.message}`, 500);
    }
  }

  /**
   * Update user profile with vehicle information
   */
  static async updateUserProfile(
    userId: string,
    data: { carNumber?: string; bikeNumber?: string }
  ) {
    try {
      const updatedProfile = await prisma.userProfile.update({
        where: { userId },
        data: data,
      });

      return updatedProfile;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ErrorResponse("User profile not found", 404);
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

      const rides = await prisma.ride.findMany({
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
      const offerRide = await prisma.ride.findUnique({
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
                  carNumber: true,
                  bikeNumber: true,
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
      const offerRides = await prisma.ride.findMany({
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
                  carNumber: true,
                  bikeNumber: true,
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
   * Enhanced validateUser method to include vehicle numbers
   */
  static async validateUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              gender: true,
              profileImage: true,
              dateOfBirth: true,
              carNumber: true, // Include car number
              bikeNumber: true, // Include bike number
            },
          },
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
      await prisma.ride.delete({
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

      const updatedRide = await prisma.ride.update({
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
                  carNumber: true,
                  bikeNumber: true,
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
