import { RideType } from "@prisma/client";

export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  cellID: string; // s2 cell token level 15
  placeId?: string | null;
}

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