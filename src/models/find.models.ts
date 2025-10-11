import { SearchRideRequest, RadiusSearchRequest } from "../interface/find.interface";
import { prisma } from "../server";
import ErrorResponse from "../utils/ErroResponse";
import { RideType } from "@prisma/client";

export class FindRideModel {
  /**
   * New method: Find rides within specified radius for both origin and destination
   */
  static async findRidesWithRadius(
    searchRequest: RadiusSearchRequest, 
    originRadius: number, 
    destinationRadius: number
  ) {
    try {
      const { originLocation, destinationLocation, date, seats, rideType, userId } = searchRequest;

      // Calculate coordinate bounds for both origin and destination
      const originBounds = this.calculateBounds(
        originLocation.latitude, 
        originLocation.longitude, 
        originRadius
      );
      const destinationBounds = this.calculateBounds(
        destinationLocation.latitude, 
        destinationLocation.longitude, 
        destinationRadius
      );

      // Build date filter
      const dateFilter = date ? {
        plannedTime: {
          gte: new Date(date + "T00:00:00.000Z"),
          lt: new Date(date + "T23:59:59.999Z")
        }
      } : {
        plannedTime: {
          gte: new Date() // Only future rides
        }
      };

      // Build filter conditions
      const whereConditions: any[] = [
        // Exclude user's own rides
        { userId: { not: userId } },
        
        // Date filter
        dateFilter,
        
        // Location proximity filter - rides where:
        // 1. Origin is within radius of search origin AND destination is within radius of search destination
        // OR
        // 2. User can join somewhere along the route (flexible matching)
        {
          OR: [
            // Exact route match: ride's origin near search origin AND ride's destination near search destination
            {
              AND: [
                {
                  originAddressLatitude: {
                    gte: originBounds.minLat,
                    lte: originBounds.maxLat
                  }
                },
                {
                  originAddressLongitude: {
                    gte: originBounds.minLng,
                    lte: originBounds.maxLng
                  }
                },
                {
                  destinationAddressLatitude: {
                    gte: destinationBounds.minLat,
                    lte: destinationBounds.maxLat
                  }
                },
                {
                  destinationAddressLongitude: {
                    gte: destinationBounds.minLng,
                    lte: destinationBounds.maxLng
                  }
                }
              ]
            },
            // Partial route match: ride's origin near search origin (user can join from start)
            {
              AND: [
                {
                  originAddressLatitude: {
                    gte: originBounds.minLat,
                    lte: originBounds.maxLat
                  }
                },
                {
                  originAddressLongitude: {
                    gte: originBounds.minLng,
                    lte: originBounds.maxLng
                  }
                }
              ]
            },
            // Partial route match: ride's destination near search destination (user can join midway)
            {
              AND: [
                {
                  destinationAddressLatitude: {
                    gte: destinationBounds.minLat,
                    lte: destinationBounds.maxLat
                  }
                },
                {
                  destinationAddressLongitude: {
                    gte: destinationBounds.minLng,
                    lte: destinationBounds.maxLng
                  }
                }
              ]
            }
          ]
        }
      ];

      // Add seats filter if provided
      if (seats) {
        whereConditions.push({ seats: { gte: seats } });
      }

      // Add ride type filter if provided (with proper enum casting)
      if (rideType && Object.values(RideType).includes(rideType as RideType)) {
        whereConditions.push({ rideType: rideType as RideType });
      }

      const rides = await prisma.offerRide.findMany({
        where: {
          AND: whereConditions
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true
                }
              }
            }
          }
        },
        orderBy: {
          plannedTime: 'asc'
        }
      });

      return rides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error in radius search: ${error.message}`, 500);
    }
  }

  /**
   * Find exact matches within a small radius (0.5km) - Original method
   */
  static async findExactMatches(searchRequest: SearchRideRequest, radius: number) {
    try {
      const { originLocation, destinationLocation, date, seats, rideType, userId } = searchRequest;

      // Calculate coordinate bounds for origin and destination
      const originBounds = this.calculateBounds(originLocation.latitude, originLocation.longitude, radius);
      const destinationBounds = this.calculateBounds(destinationLocation.latitude, destinationLocation.longitude, radius);

      // Build date filter
      const dateFilter = date ? {
        plannedTime: {
          gte: new Date(date + "T00:00:00.000Z"),
          lt: new Date(date + "T23:59:59.999Z")
        }
      } : {
        plannedTime: {
          gte: new Date() // Only future rides
        }
      };

      // Build filter conditions
      const whereConditions: any[] = [
        // Exclude user's own rides
        { userId: { not: userId } },
        
        // Origin within bounds
        {
          originAddressLatitude: {
            gte: originBounds.minLat,
            lte: originBounds.maxLat
          }
        },
        {
          originAddressLongitude: {
            gte: originBounds.minLng,
            lte: originBounds.maxLng
          }
        },
        
        // Destination within bounds
        {
          destinationAddressLatitude: {
            gte: destinationBounds.minLat,
            lte: destinationBounds.maxLat
          }
        },
        {
          destinationAddressLongitude: {
            gte: destinationBounds.minLng,
            lte: destinationBounds.maxLng
          }
        },
        
        // Date filter
        dateFilter
      ];

      // Add seats filter if provided
      if (seats) {
        whereConditions.push({ seats: { gte: seats } });
      }

      // Add ride type filter if provided (with proper enum casting)
      if (rideType && Object.values(RideType).includes(rideType as RideType)) {
        whereConditions.push({ rideType: rideType as RideType });
      }

      const rides = await prisma.offerRide.findMany({
        where: {
          AND: whereConditions
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true
                }
              }
            }
          }
        },
        orderBy: {
          plannedTime: 'asc'
        }
      });

      return rides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error in exact match: ${error.message}`, 500);
    }
  }

  /**
   * Find nearby rides within specified radius - Original method
   */
  static async findNearbyRides(searchRequest: SearchRideRequest, radius: number) {
    try {
      const { originLocation, destinationLocation, date, seats, rideType, userId } = searchRequest;

      // Calculate coordinate bounds for larger radius search
      const originBounds = this.calculateBounds(originLocation.latitude, originLocation.longitude, radius);
      const destinationBounds = this.calculateBounds(destinationLocation.latitude, destinationLocation.longitude, radius);

      // Build date filter
      const dateFilter = date ? {
        plannedTime: {
          gte: new Date(date + "T00:00:00.000Z"),
          lt: new Date(date + "T23:59:59.999Z")
        }
      } : {
        plannedTime: {
          gte: new Date() // Only future rides
        }
      };

      // Build filter conditions
      const whereConditions: any[] = [
        // Exclude user's own rides
        { userId: { not: userId } },
        
        // Origin within bounds
        {
          originAddressLatitude: {
            gte: originBounds.minLat,
            lte: originBounds.maxLat
          }
        },
        {
          originAddressLongitude: {
            gte: originBounds.minLng,
            lte: originBounds.maxLng
          }
        },
        
        // Destination within bounds
        {
          destinationAddressLatitude: {
            gte: destinationBounds.minLat,
            lte: destinationBounds.maxLat
          }
        },
        {
          destinationAddressLongitude: {
            gte: destinationBounds.minLng,
            lte: destinationBounds.maxLng
          }
        },
        
        // Date filter
        dateFilter
      ];

      // Add seats filter if provided
      if (seats) {
        whereConditions.push({ seats: { gte: seats } });
      }

      // Add ride type filter if provided (with proper enum casting)
      if (rideType && Object.values(RideType).includes(rideType as RideType)) {
        whereConditions.push({ rideType: rideType as RideType });
      }

      const rides = await prisma.offerRide.findMany({
        where: {
          AND: whereConditions
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true
                }
              }
            }
          }
        },
        orderBy: {
          plannedTime: 'asc'
        }
      });

      return rides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error in nearby search: ${error.message}`, 500);
    }
  }

  /**
   * Find rides near a specific location (for nearby rides feature)
   */
  static async findRidesNearLocation(userId: string, latitude: number, longitude: number, radius: number) {
    try {
      const bounds = this.calculateBounds(latitude, longitude, radius);

      const rides = await prisma.offerRide.findMany({
        where: {
          AND: [
            { userId: { not: userId } },
            { plannedTime: { gte: new Date() } },
            {
              OR: [
                // Origin near the location
                {
                  AND: [
                    {
                      originAddressLatitude: {
                        gte: bounds.minLat,
                        lte: bounds.maxLat
                      }
                    },
                    {
                      originAddressLongitude: {
                        gte: bounds.minLng,
                        lte: bounds.maxLng
                      }
                    }
                  ]
                },
                // Destination near the location
                {
                  AND: [
                    {
                      destinationAddressLatitude: {
                        gte: bounds.minLat,
                        lte: bounds.maxLat
                      }
                    },
                    {
                      destinationAddressLongitude: {
                        gte: bounds.minLng,
                        lte: bounds.maxLng
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              profile: {
                select: {
                  name: true,
                  phoneNumber: true,
                  profileImage: true,
                  gender: true
                }
              }
            }
          }
        },
        orderBy: {
          plannedTime: 'asc'
        }
      });

      return rides;
    } catch (error: any) {
      throw new ErrorResponse(`Database error in location search: ${error.message}`, 500);
    }
  }

  /**
   * Get popular routes based on ride frequency
   */
  static async getPopularRoutes() {
    try {
      const popularRoutes = await prisma.offerRide.groupBy({
        by: ['originAddress', 'destinationAddress'],
        _count: {
          id: true
        },
        where: {
          plannedTime: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 10 // Top 10 popular routes
      });

      return popularRoutes.map(route => ({
        origin: route.originAddress,
        destination: route.destinationAddress,
        rideCount: route._count.id
      }));
    } catch (error: any) {
      throw new ErrorResponse(`Database error in popular routes: ${error.message}`, 500);
    }
  }

  /**
   * Calculate coordinate bounds for a given center point and radius
   */
  private static calculateBounds(latitude: number, longitude: number, radiusKm: number) {
    const kmPerDegree = 111.32; // Approximate km per degree at equator
    
    const latRange = radiusKm / kmPerDegree;
    const lngRange = radiusKm / (kmPerDegree * Math.cos(latitude * Math.PI / 180));

    return {
      minLat: latitude - latRange,
      maxLat: latitude + latRange,
      minLng: longitude - lngRange,
      maxLng: longitude + lngRange
    };
  }
}
