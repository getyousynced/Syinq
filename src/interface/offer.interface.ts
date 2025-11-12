import { RideType } from "@prisma/client";
import { LocationData } from "./common";

export interface CreateOfferRideData {
  userId: string;
  originLocation: LocationData;
  destinationLocation: LocationData;
  plannedTime: Date;
  seats: number;
  rideType: RideType;
  vehicleNumber?: string | null;
}

export interface UpdateRideRequest {
  currentLocation?: LocationData;
  destinationLocation?: LocationData;
  timing?: string;
  date?: string;
  seats?: number;
  rideType?: RideType;
  vehicleNumber?: string | null;
}

export interface IndexRideRequest {
  srcCellToken: string;
  destCellToken: string;
  rideId: string;
}