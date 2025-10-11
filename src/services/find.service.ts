import { SearchRideRequest, SearchRideResponse, RadiusSearchRequest, MultiSearchRideRequest } from "../interface/find.interface";
import { FindRideModel } from "../models/find.models";
import ErrorResponse from "../utils/ErroResponse";
import {util} from "../utils/util"
import { RideType } from "@prisma/client";

export class FindRideService {
  static async serchRidesWithSrcDestCellToken(searchRequest: MultiSearchRideRequest): Promise<SearchRideResponse[]> {
    try {
      const results = await FindRideModel.searchRidesWithSrcDestCellToken(searchRequest);

      return this.processSearchResults(results, searchRequest, false);

    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Search error: ${error.message}`, 500);
    }
  }
  /**
   * New method: Search rides with flexible radius for origin and destination
   */
  static async searchRidesWithRadius(searchRequest: RadiusSearchRequest): Promise<SearchRideResponse[]> {
    try {
      // Validate search parameters
      this.validateRadiusSearchRequest(searchRequest);

      // Search with progressive radius expansion if needed
      let searchResults: any[] = [];
      let currentOriginRadius = 1.0; // Start with 1km
      let currentDestinationRadius = 1.0;

      // Progressive search: start with 1km, expand to user-specified radius
      while (
        searchResults.length < 5 && // Continue until we find at least 5 rides
        currentOriginRadius <= searchRequest.originRadius &&
        currentDestinationRadius <= searchRequest.destinationRadius
      ) {
        const results = await FindRideModel.findRidesWithRadius(
          searchRequest,
          currentOriginRadius,
          currentDestinationRadius
        );

        // Merge results and remove duplicates
        const newResults = results.filter(
          result => !searchResults.some(existing => existing.id === result.id)
        );
        searchResults = [...searchResults, ...newResults];

        // Expand radius for next iteration
        currentOriginRadius = Math.min(currentOriginRadius + 0.5, searchRequest.originRadius);
        currentDestinationRadius = Math.min(currentDestinationRadius + 0.5, searchRequest.destinationRadius);

        // Break if we've reached the maximum specified radius
        if (currentOriginRadius >= searchRequest.originRadius && 
            currentDestinationRadius >= searchRequest.destinationRadius) {
          break;
        }
      }

      return this.processRadiusSearchResults(searchResults, searchRequest);

    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Radius search error: ${error.message}`, 500);
    }
  }

  /**
   * Original search method (kept for backward compatibility)
   */
  static async searchRides(searchRequest: SearchRideRequest): Promise<SearchRideResponse[]> {
    try {
      // Validate search parameters
      this.validateSearchRequest(searchRequest);

      // First try to find exact matches (within 0.5km)
      const exactMatches = await FindRideModel.findExactMatches(searchRequest, 0.5);

      if (exactMatches.length > 0) {
        // Return exact matches if found
        return this.processSearchResults(exactMatches, searchRequest, true);
      }

      // If no exact matches, search within specified radius
      const nearbyMatches = await FindRideModel.findNearbyRides(
        searchRequest,
        searchRequest.maxDistance || 2.0
      );

      return this.processSearchResults(nearbyMatches, searchRequest, false);

    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Search error: ${error.message}`, 500);
    }
  }

  /**
   * Get rides near a specific location
   */
  static async getNearbyRides(userId: string, latitude: number, longitude: number, radius: number) {
    try {
      const nearbyRides = await FindRideModel.findRidesNearLocation(
        userId,
        latitude,
        longitude,
        radius
      );

      return nearbyRides.map(ride => ({
        ...ride,
        distance: this.calculateDistance(
          latitude,
          longitude,
          ride.originAddressLatitude,
          ride.originAddressLongitude
        )
      }));

    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(`Nearby search error: ${error.message}`, 500);
    }
  }

  /**
   * Get popular routes based on ride frequency
   */
  static async getPopularRoutes() {
    try {
      return await FindRideModel.getPopularRoutes();
    } catch (error: any) {
      throw new ErrorResponse(`Popular routes error: ${error.message}`, 500);
    }
  }

  /**
   * Validate radius search request
   */
  private static validateRadiusSearchRequest(request: RadiusSearchRequest) {
    const { originLocation, destinationLocation } = request;

    // Check if origin and destination are too close
    const distance = this.calculateDistance(
      originLocation.latitude,
      originLocation.longitude,
      destinationLocation.latitude,
      destinationLocation.longitude
    );

    if (distance < 0.5) {
      throw new ErrorResponse("Origin and destination are too close (minimum 500m apart)", 400);
    }

    if (distance > 500) { // 500km max
      throw new ErrorResponse("Origin and destination are too far apart (maximum 500km)", 400);
    }

    // Validate radius values
    if (request.originRadius < 1 || request.originRadius > 5) {
      throw new ErrorResponse("Origin radius must be between 1 and 5 km", 400);
    }

    if (request.destinationRadius < 1 || request.destinationRadius > 5) {
      throw new ErrorResponse("Destination radius must be between 1 and 5 km", 400);
    }

    // Validate date is in future if provided
    if (request.date) {
      const searchDate = new Date(request.date);
      if (searchDate <= new Date()) {
        throw new ErrorResponse("Search date must be in the future", 400);
      }
    }
  }

  /**
   * Private method to validate search request (original method)
   */
  private static validateSearchRequest(request: SearchRideRequest) {
    const { originLocation, destinationLocation } = request;

    // Check if origin and destination are too close
    const distance = this.calculateDistance(
      originLocation.latitude,
      originLocation.longitude,
      destinationLocation.latitude,
      destinationLocation.longitude
    );

    if (distance < 0.5) {
      throw new ErrorResponse("Origin and destination are too close (minimum 500m apart)", 400);
    }

    if (distance > 500) { // 500km max
      throw new ErrorResponse("Origin and destination are too far apart (maximum 500km)", 400);
    }

    // Validate max distance
    if (request.maxDistance && (request.maxDistance < 0 || request.maxDistance > 50)) {
      throw new ErrorResponse("Max distance must be between 0 and 50 km", 400);
    }

    // Validate date is in future if provided
    if (request.date) {
      const searchDate = new Date(request.date);
      if (searchDate <= new Date()) {
        throw new ErrorResponse("Search date must be in the future", 400);
      }
    }
  }

  /**
   * Process radius search results
   */
  private static processRadiusSearchResults(
    rides: any[],
    searchRequest: RadiusSearchRequest
  ): SearchRideResponse[] {
    return rides.map(ride => {
      const originDistance = this.calculateDistance(
        searchRequest.originLocation.latitude,
        searchRequest.originLocation.longitude,
        ride.originAddressLatitude,
        ride.originAddressLongitude
      );

      const destinationDistance = this.calculateDistance(
        searchRequest.destinationLocation.latitude,
        searchRequest.destinationLocation.longitude,
        ride.destinationAddressLatitude,
        ride.destinationAddressLongitude
      );

      return {
        id: ride.id,
        userId: ride.userId,
        originAddress: ride.originAddress,
        originAddressLatitude: ride.originAddressLatitude,
        originAddressLongitude: ride.originAddressLongitude,
        destinationAddress: ride.destinationAddress,
        destinationAddressLatitude: ride.destinationAddressLatitude,
        destinationAddressLongitude: ride.destinationAddressLongitude,
        plannedTime: ride.plannedTime,
        rideType: ride.rideType,
        seats: ride.seats,
        VehicleNumber: ride.VehicleNumber,
        user: ride.user,
        originDistance: Math.round(originDistance * 100) / 100,
        destinationDistance: Math.round(destinationDistance * 100) / 100,
        totalDistance: Math.round((originDistance + destinationDistance) * 100) / 100,
        isExactMatch: originDistance <= 0.5 && destinationDistance <= 0.5
      };
    }).sort((a, b) => {
      // Sort by total distance (origin + destination)
      return a.totalDistance - b.totalDistance;
    });
  }

  /**
   * Process search results and add distance calculations (original method)
   */
  private static processSearchResults(
    rides: any[],
    searchRequest : SearchRideRequest | MultiSearchRideRequest,
    isExactMatch: boolean
  ): SearchRideResponse[] {
    return rides.map(ride => {

      const originDistance = util.calculateDistance(
        searchRequest.originLocation.latitude,
        searchRequest.originLocation.longitude,
        ride.originAddressLatitude,
        ride.originAddressLongitude
      );

      const destinationDistance = util.calculateDistance(
        searchRequest.destinationLocation.latitude,
        searchRequest.destinationLocation.longitude,
        ride.destinationAddressLatitude,
        ride.destinationAddressLongitude
      );

      return {
        id: ride.id,
        userId: ride.userId,
        originAddress: ride.originAddress,
        originAddressLatitude: ride.originAddressLatitude,
        originAddressLongitude: ride.originAddressLongitude,
        destinationAddress: ride.destinationAddress,
        destinationAddressLatitude: ride.destinationAddressLatitude,
        destinationAddressLongitude: ride.destinationAddressLongitude,
        plannedTime: ride.plannedTime,
        rideType: ride.rideType,
        seats: ride.seats,
        VehicleNumber: ride.VehicleNumber,
        user: ride.user,
        originDistance: Math.round(originDistance * 100) / 100,
        destinationDistance: Math.round(destinationDistance * 100) / 100,
        isExactMatch: isExactMatch
      };
    }).sort((a, b) => {
      // Sort by total distance (origin + destination)
      const totalDistanceA = a.originDistance + a.destinationDistance;
      const totalDistanceB = b.originDistance + b.destinationDistance;
      return totalDistanceA - totalDistanceB;
    });
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
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
}
