import { getS2CellToken, nearByS2CellTokens,  } from "./util";
import { s1, s2 } from 's2js';

// Src 28.5439106,77.3331085

console.log(nearByS2CellTokens(28.5439106, 77.3331085, 2));

let token = getS2CellToken(28.5439106, 77.3331085)

console.log(token);

const cellID = s2.cellid.fromToken(token);
cellID.toString();

console.log('CellID:', cellID.toString(), cellID);

const latlng = s2.cellid.latLng(cellID);

console.log('LatLng from CellID:', latlng.toString(), latlng);

const lat = latlng.lat * (180 / Math.PI);
const lng = latlng.lng * (180 / Math.PI);
console.log(lat, lng)

const lat1 = s1.angle.degrees(latlng.lat)
const lng1 = s1.angle.degrees(latlng.lng)

console.log(lat1, lng1)
//-15.44508943096635 -69.14023764899713