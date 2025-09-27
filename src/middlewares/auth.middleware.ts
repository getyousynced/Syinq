import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { prisma } from "../server";
import { AuthRequest, JwtPayload } from "../interface/auth.interace";
import { AuthService } from "../services/auth.service";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken: string | undefined;
    let refreshToken: string | undefined;

    // Extract Access token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    // Extract refresh token from x-refresh-token header (case insensitive)
    if (req.headers["x-refresh-token"]) {
      refreshToken = req.headers["x-refresh-token"] as string;
    }

    // Handle refresh token flow if no access token
    if (!accessToken && refreshToken) {
      try {
        // Check if refresh token is blacklisted
        if (AuthService.isTokenBlacklisted(refreshToken)) {
          return next(new ErrorResponse("Token has been revoked", 401));
        }
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        ) as JwtPayload;

        const newAccessToken = jwt.sign(
          {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            isActivated: decoded.isActivated,
            jti: `${decoded.userId}-${Date.now()}`,
          },
          process.env.JWT_ACCESS_SECRET!,
          {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
          } as jwt.SignOptions
        );

        // Set user in request
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        };

        // Send new access token in response header
        res.setHeader("X-New-Access-Token", newAccessToken);

        return next();
      } catch (error) {
        return next(new ErrorResponse("Invalid refresh token", 401));
      }
    }

    if (!accessToken) {
      return next(new ErrorResponse("No access token provided", 401));
    }

    try {
      // Check if access token is blacklisted
      if (AuthService.isTokenBlacklisted(accessToken)) {
        return next(new ErrorResponse("Token has been revoked", 401));
      }

      // Verify the access token
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as JwtPayload;

      // Get user from database to ensure they still exist
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true,
          isActivated: true,
          suspended: true,
        },
      });

      if (!user) {
        return next(new ErrorResponse("User not found", 401));
      }

      if (user.suspended) {
        return next(new ErrorResponse("Account suspended", 403));
      }

      if (!user.isActivated) {
        return next(new ErrorResponse("Account not activated", 403));
      }

      // Attach user to request object with the format expected by controllers
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (jwtError: any) {
      return next(new ErrorResponse("Invalid or expired token", 401));
    }
  } catch (error: any) {
    return next(new ErrorResponse("Authentication failed", 500));
  }
};
