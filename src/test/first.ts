import { util } from '../utils/util';

console.log("Log: ", util.nearByS2CellTokens(28.5204, 77.2072, 2));
console.log("S2 Cell Token Log: ", util.getS2CellToken(28.5204, 77.2072));


// {
//   userId: '68eb88752b91a37e675443e0',
//   originLocation: {
//     address: 'Saket Metro Station, New Delhi, Delhi',
//     latitude: 28.5204,
//     longitude: 77.2072,
//     placeId: 'ChIJK1ZQxdAZDDkREK_HuAF9bpY'
//   },
//   destinationLocation: {
//     address: 'Hauz Khas Village, New Delhi, Delhi',
//     latitude: 28.5494,
//     longitude: 77.1932,
//     placeId: 'ChIJXXGCQdAZDDkREMO5cRL9AKI'
//   },
//   date: '2025-10-16',
//   seats: 2,
//   rideType: 'CAB',
//   originRadius: 2,
//   destinationRadius: 2,
//   maxRadius: 5,
//   srcCellTokens: [],
//   destCellTokens: []
// }