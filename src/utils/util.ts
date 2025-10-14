import { s1, s2 } from 's2js';

// Corrected function
export function getS2CellToken(lat: number, lng: number, level: number = 15): string {
    const latlng = s2.LatLng.fromDegrees(lat, lng);
    const cellId = s2.cellid.parent(s2.cellid.fromLatLng(latlng), level);
    return s2.cellid.toToken(cellId);
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

export function nearByS2CellTokens(
    lat: number,
    lng: number,
    radiusKm: number,
    level: number = 15
): string[] {
    // Convert lat/lng to S2LatLng and then to Point
    const centerLatLng = s2.LatLng.fromDegrees(lat, lng);
    const centerPoint = s2.Point.fromLatLng(centerLatLng);

    const radian = kmToRadians(radiusKm);
    const cap = new s2.Cap(centerPoint, s1.chordangle.fromAngle(radian));

    const coverer = new s2.RegionCoverer();
    coverer.minLevel = level;
    coverer.maxLevel = level;
    coverer.maxCells = 200;

    const cellUnion = coverer.covering(cap);
    if (!cellUnion) {
        return [];
    }

    // Validate cell levels and return tokens
    const tokens: string[] = [];
    cellUnion.forEach(cellId => {
        if (s2.cellid.level(cellId) !== level) {
            throw new Error('CellUnion contains cells of incorrect level');
        }
        tokens.push(s2.cellid.toToken(cellId));
    });
    return tokens;
}

export function kmToRadians(km: number): number {
    const earthRadiusKm = 6371; // Average radius of the Earth in kilometers
    return km / earthRadiusKm;
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