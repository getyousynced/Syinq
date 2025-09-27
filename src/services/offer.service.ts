import { RideType } from "@prisma/client";
import {
  CreateOfferRideData,
  LocationData,
  UpdateRideRequest,
} from "../interface/offer.interface";
import { OfferRideModel } from "../models/offer.models";
import ErrorResponse from "../utils/ErroResponse";

export interface PublishRideRequest {
  userId: string;
  currentLocation: LocationData;
  destinationLocation: LocationData;
  timing: string;
  date: string;
  seats: number;
  rideType: RideType;
  vehicleNumber?: string | null;
}

export class OfferRideService {
  /**
   * Publish a new ride
   */
  static async publishRide(rideData: PublishRideRequest) {
    try {
      // Validate user can publish ride and get user data
      const user = await this.validateUserForPublishing(rideData.userId);

      // Auto-assign vehicle number based on ride type and profile
      const finalVehicleNumber = await this.resolveVehicleNumber(
        user,
        rideData.rideType,
        rideData.vehicleNumber
      );

      // Validate and process date/time
      const plannedDateTime = this.processDateTime(
        rideData.date,
        rideData.timing
      );

      // Validate locations
      this.validateLocations(
        rideData.currentLocation,
        rideData.destinationLocation
      );

      // Validate seats with ride type
      this.validateSeatsWithRideType(rideData.seats, rideData.rideType);

      // Check vehicle number uniqueness only if provided
      if (finalVehicleNumber) {
        await this.validateVehicleNumberUniqueness(
          rideData.userId,
          finalVehicleNumber
        );
      }

      // Prepare data for model
      const createData: CreateOfferRideData = {
        userId: rideData.userId,
        originLocation: rideData.currentLocation,
        destinationLocation: rideData.destinationLocation,
        plannedTime: plannedDateTime,
        seats: rideData.seats,
        rideType: rideData.rideType,
        vehicleNumber: finalVehicleNumber,
      };

      // Create ride using model
      const newRide = await OfferRideModel.create(createData);

      return newRide;
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Service error: ${error.message}`, 500);
    }
  }

  /**
   * Resolve vehicle number based on ride type and user profile
   */
  private static async resolveVehicleNumber(
    user: any,
    rideType: RideType,
    providedVehicleNumber?: string | null
  ): Promise<string | null> {
    if (rideType === RideType.CAB) {
      return null; // CAB rides don't need vehicle numbers
    }

    // For CAR and BIKE rides, check profile first
    const profileVehicleNumber =
      rideType === RideType.CAR
        ? user.profile?.carNumber
        : user.profile?.bikeNumber;

    if (profileVehicleNumber) {
      // Use existing vehicle number from profile
      return profileVehicleNumber.toUpperCase();
    }

    // No vehicle number in profile - require one to be provided
    if (!providedVehicleNumber || !providedVehicleNumber.trim()) {
      throw new ErrorResponse(
        `No ${rideType.toLowerCase()} number found in your profile. Please provide a vehicle number or update your profile.`,
        400
      );
    }

    // Validate the provided vehicle number
    this.validateVehicleNumber(providedVehicleNumber);
    this.validateVehicleNumberForRideType(providedVehicleNumber, rideType);

    // Check if vehicle number is already associated with another user
    await this.validateVehicleNumberOwnership(
      providedVehicleNumber.toUpperCase(),
      rideType,
      user.id
    );

    // Save the new vehicle number to user profile
    await this.saveVehicleNumberToProfile(
      user.id,
      rideType,
      providedVehicleNumber.toUpperCase()
    );

    return providedVehicleNumber.toUpperCase();
  }

  /**
   * Check if vehicle number is already registered to another user
   */
  private static async validateVehicleNumberOwnership(
    vehicleNumber: string,
    rideType: RideType,
    currentUserId: string
  ) {
    try {
      const existingOwner = await OfferRideModel.checkVehicleNumberOwnership(
        vehicleNumber,
        rideType,
        currentUserId
      );

      if (existingOwner) {
        throw new ErrorResponse(
          `This ${rideType.toLowerCase()} number is already registered to another user account. Each vehicle can only be associated with one account.`,
          409
        );
      }
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Validation error: ${error.message}`, 500);
    }
  }

  /**
   * Save vehicle number to user profile
   */
  private static async saveVehicleNumberToProfile(
    userId: string,
    rideType: RideType,
    vehicleNumber: string
  ) {
    try {
      const updateData =
        rideType === RideType.CAR
          ? { carNumber: vehicleNumber }
          : { bikeNumber: vehicleNumber };

      await OfferRideModel.updateUserProfile(userId, updateData);
    } catch (error: any) {
      throw new ErrorResponse(
        `Failed to save vehicle number to profile: ${error.message}`,
        500
      );
    }
  }

  /**
   * Get user's published rides
   */
  static async getUserRides(userId: string) {
    try {
      const rides = await OfferRideModel.findByUserId(userId);
      return rides;
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Service error: ${error.message}`, 500);
    }
  }

  /**
   * Get ride by ID
   */
  static async getRideById(rideId: string) {
    try {
      const ride = await OfferRideModel.findById(rideId);

      if (!ride) {
        throw new ErrorResponse("Ride not found", 404);
      }

      return ride;
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Service error: ${error.message}`, 500);
    }
  }

  /**
   * Delete ride
   */
  static async deleteRide(rideId: string, userId: string) {
    try {
      // First check if ride exists and belongs to user
      const ride = await OfferRideModel.findById(rideId);

      if (!ride) {
        throw new ErrorResponse("Ride not found", 404);
      }

      if (ride.userId !== userId) {
        throw new ErrorResponse(
          "You don't have permission to delete this ride",
          403
        );
      }

      // Check if ride is in the future (can't delete past rides)
      if (ride.plannedTime <= new Date()) {
        throw new ErrorResponse("Cannot delete past rides", 400);
      }

      await OfferRideModel.delete(rideId);

      return { message: "Ride deleted successfully" };
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Service error: ${error.message}`, 500);
    }
  }

  /**
   * Private method to validate user can publish ride
   */
  private static async validateUserForPublishing(userId: string) {
    const user = await OfferRideModel.validateUser(userId);

    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    if (!user.isActivated) {
      throw new ErrorResponse("User account is not activated", 403);
    }

    if (user.suspended) {
      throw new ErrorResponse("User account is suspended", 403);
    }

    if (!user.profile) {
      throw new ErrorResponse(
        "Please complete your profile before publishing a ride",
        400
      );
    }

    if (!user.collegeInfo) {
      throw new ErrorResponse(
        "Please add your college information before publishing a ride",
        400
      );
    }

    if (!user.collegeInfo.verifyMail) {
      throw new ErrorResponse(
        "Please verify your college email before publishing a ride",
        400
      );
    }

    return user;
  }

  /**
   * Private method to process and validate date/time
   */
  private static processDateTime(date: string, timing: string): Date {
    const plannedDateTime = new Date(`${date}T${timing}`);

    if (isNaN(plannedDateTime.getTime())) {
      throw new ErrorResponse("Invalid date or time format", 400);
    }

    if (plannedDateTime <= new Date()) {
      throw new ErrorResponse("Planned time must be in the future", 400);
    }

    // Check if the date is not too far in the future (e.g., 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    if (plannedDateTime > thirtyDaysFromNow) {
      throw new ErrorResponse(
        "Cannot schedule rides more than 30 days in advance",
        400
      );
    }

    return plannedDateTime;
  }

  /**
   * Private method to validate location data
   */
  private static validateLocations(
    currentLocation: LocationData,
    destinationLocation: LocationData
  ) {
    // Validate current location
    if (
      !currentLocation.address ||
      !currentLocation.latitude ||
      !currentLocation.longitude
    ) {
      throw new ErrorResponse(
        "Current location must include address, latitude, and longitude",
        400
      );
    }

    // Validate destination location
    if (
      !destinationLocation.address ||
      !destinationLocation.latitude ||
      !destinationLocation.longitude
    ) {
      throw new ErrorResponse(
        "Destination location must include address, latitude, and longitude",
        400
      );
    }

    // Validate coordinates range
    if (
      Math.abs(currentLocation.latitude) > 90 ||
      Math.abs(currentLocation.longitude) > 180
    ) {
      throw new ErrorResponse("Invalid current location coordinates", 400);
    }

    if (
      Math.abs(destinationLocation.latitude) > 90 ||
      Math.abs(destinationLocation.longitude) > 180
    ) {
      throw new ErrorResponse("Invalid destination location coordinates", 400);
    }

    // Check if origin and destination are not the same
    const distance = this.calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      destinationLocation.latitude,
      destinationLocation.longitude
    );

    if (distance < 0.5) {
      // Less than 500 meters
      throw new ErrorResponse(
        "Origin and destination must be at least 500 meters apart",
        400
      );
    }
  }

  /**
   * Helper method to calculate distance between two coordinates
   */
  private static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Update ride
   */
  static async updateRide(
    rideId: string,
    userId: string,
    updateData: UpdateRideRequest
  ) {
    try {
      // First check if ride exists and belongs to user
      const existingRide = await OfferRideModel.findById(rideId);

      if (!existingRide) {
        throw new ErrorResponse("Ride not found", 404);
      }

      if (existingRide.userId !== userId) {
        throw new ErrorResponse(
          "You don't have permission to update this ride",
          403
        );
      }

      // Check if ride is in the future (can't update past rides)
      if (existingRide.plannedTime <= new Date()) {
        throw new ErrorResponse("Cannot update past rides", 400);
      }

      // Prepare update data
      const updatePayload: Partial<CreateOfferRideData> = {};

      // Handle location updates
      if (updateData.currentLocation) {
        this.validateSingleLocation(
          updateData.currentLocation,
          "Current location"
        );
        updatePayload.originLocation = updateData.currentLocation;
      }

      if (updateData.destinationLocation) {
        this.validateSingleLocation(
          updateData.destinationLocation,
          "Destination location"
        );
        updatePayload.destinationLocation = updateData.destinationLocation;
      }

      // Handle date/time update
      if (updateData.date && updateData.timing) {
        const plannedDateTime = this.processDateTime(
          updateData.date,
          updateData.timing
        );
        updatePayload.plannedTime = plannedDateTime;
      } else if (updateData.date || updateData.timing) {
        throw new ErrorResponse(
          "Both date and timing must be provided together",
          400
        );
      }

      // Handle seats update
      if (updateData.seats !== undefined) {
        this.validateSeatsWithRideType(updateData.seats, existingRide.rideType);
        updatePayload.seats = updateData.seats;
      }

      // Handle rideType and vehicle number updates
      if (updateData.rideType || updateData.vehicleNumber !== undefined) {
        const user = await OfferRideModel.validateUser(userId);
        const newRideType = updateData.rideType || existingRide.rideType;

        const finalVehicleNumber = await this.resolveVehicleNumberForUpdate(
          user,
          newRideType,
          updateData.vehicleNumber,
          existingRide.VehicleNumber ?? undefined
        );

        if (updateData.rideType) {
          updatePayload.rideType = newRideType;
        }

        if (updateData.vehicleNumber !== undefined || updateData.rideType) {
          updatePayload.vehicleNumber = finalVehicleNumber;
        }
      }

      // Validate locations are not the same if both are being updated
      const finalOrigin: LocationData = updatePayload.originLocation || {
        address: existingRide.originAddress,
        latitude: existingRide.originAddressLatitude,
        longitude: existingRide.originAddressLongitude,
        placeId: existingRide.originAddressPlaceId || undefined,
      };

      const finalDestination: LocationData =
        updatePayload.destinationLocation || {
          address: existingRide.destinationAddress,
          latitude: existingRide.destinationAddressLatitude,
          longitude: existingRide.destinationAddressLongitude,
          placeId: existingRide.destinationAddressPlaceId || undefined,
        };

      this.validateLocationDistance(finalOrigin, finalDestination);

      // Update ride using model
      const updatedRide = await OfferRideModel.update(rideId, updatePayload);

      return updatedRide;
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Service error: ${error.message}`, 500);
    }
  }

  /**
   * Resolve vehicle number for updates
   */
  private static async resolveVehicleNumberForUpdate(
    user: any,
    rideType: RideType,
    providedVehicleNumber: string | null | undefined,
    currentVehicleNumber: string | null | undefined
  ): Promise<string | null> {
    if (rideType === RideType.CAB) {
      return null;
    }

    // If vehicle number is explicitly provided (and not null)
    if (providedVehicleNumber !== undefined && providedVehicleNumber !== null) {
      if (!providedVehicleNumber.trim()) {
        throw new ErrorResponse(
          `Vehicle number is required for ${rideType} rides`,
          400
        );
      }

      this.validateVehicleNumber(providedVehicleNumber);
      this.validateVehicleNumberForRideType(providedVehicleNumber, rideType);

      // Check vehicle ownership if it's different from current profile vehicle
      const profileVehicleNumber =
        rideType === RideType.CAR
          ? user.profile?.carNumber
          : user.profile?.bikeNumber;

      if (
        providedVehicleNumber.toUpperCase() !==
          profileVehicleNumber?.toUpperCase() &&
        providedVehicleNumber.toUpperCase() !==
          currentVehicleNumber?.toUpperCase()
      ) {
        await this.validateVehicleNumberOwnership(
          providedVehicleNumber.toUpperCase(),
          rideType,
          user.id
        );
      }

      return providedVehicleNumber.toUpperCase();
    }

    // If vehicle number is explicitly set to null (user wants to remove it)
    if (providedVehicleNumber === null) {
      throw new ErrorResponse(
        `Vehicle number is required for ${rideType} rides and cannot be removed`,
        400
      );
    }

    // Check profile for existing vehicle number
    const profileVehicleNumber =
      rideType === RideType.CAR
        ? user.profile?.carNumber
        : user.profile?.bikeNumber;

    if (profileVehicleNumber) {
      return profileVehicleNumber.toUpperCase();
    }

    // Use current vehicle number if available (handle null case)
    if (currentVehicleNumber) {
      return currentVehicleNumber;
    }

    // No vehicle number available
    throw new ErrorResponse(
      `No ${rideType.toLowerCase()} number found. Please provide a vehicle number.`,
      400
    );
  }

  private static validateVehicleNumber(vehicleNumber: string) {
    if (!vehicleNumber || !vehicleNumber.trim()) {
      throw new ErrorResponse("Vehicle number is required", 400);
    }

    const cleanVehicleNumber = vehicleNumber.trim().toUpperCase();

    // Basic format validation - adjust regex based on your country's format
    const vehicleNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;

    if (!vehicleNumberRegex.test(cleanVehicleNumber)) {
      throw new ErrorResponse(
        "Invalid vehicle number format. Expected format: XX00XX0000 (e.g., DL01AB1234)",
        400
      );
    }

    // Check length constraints
    if (cleanVehicleNumber.length < 6 || cleanVehicleNumber.length > 13) {
      throw new ErrorResponse(
        "Vehicle number must be between 6 and 13 characters",
        400
      );
    }
  }

  private static async validateVehicleNumberUniqueness(
    userId: string,
    vehicleNumber: string,
    excludeRideId?: string
  ) {
    try {
      const existingRides = await OfferRideModel.findActiveRidesByVehicleNumber(
        vehicleNumber.toUpperCase(),
        excludeRideId
      );

      if (existingRides.length > 0) {
        // Check if any existing ride belongs to a different user
        const otherUserRides = existingRides.filter(
          (ride) => ride.userId !== userId
        );

        if (otherUserRides.length > 0) {
          throw new ErrorResponse(
            "This vehicle number is already being used for another active ride",
            409
          );
        }

        // Check if current user has overlapping rides with same vehicle
        const currentTime = new Date();
        const overlappingRides = existingRides.filter((ride) => {
          const rideTime = new Date(ride.plannedTime);
          const timeDifference = Math.abs(
            rideTime.getTime() - currentTime.getTime()
          );
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          // Check if rides are within 2 hours of each other
          return hoursDifference < 2;
        });

        if (overlappingRides.length > 0) {
          throw new ErrorResponse(
            "You cannot use the same vehicle for overlapping ride times",
            409
          );
        }
      }
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Validation error: ${error.message}`, 500);
    }
  }

  /**
   * Private method to validate single location
   */
  private static validateSingleLocation(
    location: LocationData,
    locationName: string
  ) {
    if (!location.address || !location.latitude || !location.longitude) {
      throw new ErrorResponse(
        `${locationName} must include address, latitude, and longitude`,
        400
      );
    }

    if (
      Math.abs(location.latitude) > 90 ||
      Math.abs(location.longitude) > 180
    ) {
      throw new ErrorResponse(
        `Invalid ${locationName.toLowerCase()} coordinates`,
        400
      );
    }
  }

  /**
   * Enhanced seats validation with ride type considerations
   */
  private static validateSeatsWithRideType(seats: number, rideType: RideType) {
    if (!seats || typeof seats !== "number") {
      throw new ErrorResponse("Seats must be a valid number", 400);
    }

    if (!Number.isInteger(seats)) {
      throw new ErrorResponse("Seats must be a whole number", 400);
    }

    if (seats < 1) {
      throw new ErrorResponse("At least 1 seat must be available", 400);
    }

    // Add ride type specific seat validations
    if (rideType === RideType.BIKE && seats > 1) {
      throw new ErrorResponse("Bike rides can have maximum 1 seat", 400);
    }

    if (seats > 6) {
      throw new ErrorResponse("Maximum 6 seats allowed", 400);
    }
  }

  /**
   * Validate vehicle number format for specific ride types
   */
  private static validateVehicleNumberForRideType(
    vehicleNumber: string,
    rideType: RideType
  ) {
    const cleanVehicleNumber = vehicleNumber.trim().toUpperCase();

    switch (rideType) {
      case RideType.BIKE:
        // Bikes typically have shorter numbers
        if (cleanVehicleNumber.length > 10) {
          throw new ErrorResponse(
            "Bike vehicle numbers are typically shorter",
            400
          );
        }
        break;
      case RideType.CAR:
        // Cars typically have standard format
        if (cleanVehicleNumber.length < 8) {
          throw new ErrorResponse(
            "Car vehicle numbers must be at least 8 characters",
            400
          );
        }
        break;
      default:
        break;
    }
  }

  /**
   * Private method to validate distance between two locations
   */
  private static validateLocationDistance(
    origin: LocationData,
    destination: LocationData
  ) {
    const distance = this.calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    );

    if (distance < 0.5) {
      // Less than 500 meters
      throw new ErrorResponse(
        "Origin and destination must be at least 500 meters apart",
        400
      );
    }
  }
}
