import * as s2 from '@radarlabs/s2';
import { RegionCoverer, RegionCovererOptions } from '@radarlabs/s2';
import exp from 'constants';

// Corrected function
export function getS2CellToken(lat: number, lng: number, level: number = 15): string {
    const latlng = new s2.LatLng(lat, lng);
    const cellId = new s2.CellId(latlng).parent(level);
    return cellId.token();
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

export function nearByS2Cells(
    lat: number,
    lng: number,
    radiusKm: number,
    level: number = 15
): string[] {
    // Convert lat/lng to S2LatLng and then to Point
    const centerLatLng = new s2.LatLng(lat, lng);

    const options: s2.RegionCovererOptions = {
        min: 15,     // smallest S2 level allowed
        max: 15,     // largest S2 level allowed
        max_cells: 200      // max number of cells in the covering
    };

    const cellUnion = RegionCoverer.getRadiusCovering(
        centerLatLng,
        radiusKm * 1000,
        options
    );

    if (cellUnion == null) {
        return [];
    }

    // Return token strings
    return cellUnion.tokens();
}

export function isValidLatitude(lat: number): boolean {
    return lat >= -90 && lat <= 90;
}

export function isValidLongitude(lng: number): boolean {
    return lng >= -180 && lng <= 180;
}

export function isValidCoordinates(lat: number, lng: number): boolean {
    return isValidLatitude(lat) && isValidLongitude(lng);
}

export * as util from './util';