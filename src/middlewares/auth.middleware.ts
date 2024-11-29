import { AuthRequest } from './interface.ts';
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import ErrorResponse from "../utils/ErroResponse.ts";



export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return next(new ErrorResponse("No token provided", 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
      req.user = {
        id: decoded.id as string, 
        email: decoded.email as string
      };
      next();
    } catch (err) {
      return next(new ErrorResponse("Invalid token", 401));
    }
  };

