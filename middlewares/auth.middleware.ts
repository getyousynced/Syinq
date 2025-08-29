import { Message } from './../node_modules/.prisma/client/index.d';
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { prisma } from '../server';
import { AuthRequest, JwtPayload } from "../interface/auth.interace";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    
    let accessToken: string | undefined;
    let refreshToken: string | undefined;

    // Extract Access token from header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
      accessToken = req.headers.authorization.split(" ")[1];
    }

    // Extract refresh token from X-Refresh-Token header
    if (req.headers["x-refresh-token"]) {
      refreshToken = req.headers["x-refresh-token"] as string;
    }

    if (!accessToken && refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        ) as JwtPayload;

        const newAccessToken = jwt.sign(
          {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
          },
          process.env.JWT_ACCESS_SECRET!,
          {
            expiresIn: "15m",
          }
        );

        // Set user in request with role from refresh token
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
      // Verify the token
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as JwtPayload;

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        return next(new ErrorResponse("User not found", 401));
      }

      // Attach user to request object
      req.user = user as any;
      next();
    } catch (jwtError) {
      return next(new ErrorResponse("Invalid or expired token", 401));
    }
  } catch (error) {
  }
};

