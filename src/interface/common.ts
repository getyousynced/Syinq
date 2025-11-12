export interface LocationData {
    address: string;
    latitude: number;
    longitude: number;
    cellToken: string; // s2 cell token level 15
    placeId?: string | null;
}