import { RideType } from "@prisma/client";
import { LocationData } from "./common";

export interface MultiSearchRideRequest {
  userId: string;
  srcCellTokens: string[];
  destCellTokens: string[];
  originLocation: LocationData;
  destinationLocation: LocationData;
  seats?: number;
  rideType?: RideType; // Use RideType enum instead of string
  page?: number;
  limit?: number;
}

export interface SearchRideRequest {
  userId: string;
  originLocation: LocationData;
  destinationLocation: LocationData;
  date?: string;
  seats?: number;
  rideType?: RideType; // Use RideType enum instead of string
  maxDistance?: number;
}

export interface RadiusSearchRequest {
  userId: string;
  originLocation: LocationData;
  destinationLocation: LocationData;
  date?: string;
  seats?: number;
  rideType?: RideType; // Use RideType enum instead of string
  originRadius: number;      // Radius for origin search (1-5km)
  destinationRadius: number; // Radius for destination search (1-5km)
  maxRadius: number;         // Maximum allowed radius
}

export interface SearchRideResponse {
  id: string;
  userId: string;
  originAddress: string;
  originAddressLatitude: number;
  originAddressLongitude: number;
  destinationAddress: string;
  destinationAddressLatitude: number;
  destinationAddressLongitude: number;
  plannedTime: Date;
  rideType: RideType; // Use RideType enum instead of string
  seats: number;
  VehicleNumber: string | null;
  user: {
    id: string;
    email: string;
    role: string;
    profile: {
      name: string;
      phoneNumber: string;
      profileImage: string | null;
      gender: string;
    } | null;
  };
  originDistance: number;
  destinationDistance: number;
  totalDistance?: number;
  isExactMatch: boolean;
}
