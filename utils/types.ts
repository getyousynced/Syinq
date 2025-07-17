export interface FindRideInput {
originAddressId: string;
stopId: string;
  dateTime: string;
  seat_capacity: number;
}

export interface OfferRideInput {
  originAddressId: String;
  destinationAddressId: String;
  ypeOfRide: "Cab" | "Self";
  carId?: String; // only for "Self"
  askForFair: boolean;
  amount: number;
}
