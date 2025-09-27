import { NextFunction, Request, RequestHandler, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { AuthService } from "../services/auth.service";

const authenticateByEmail: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) return next(new ErrorResponse("Email is required", 400));

    const result = await AuthService.handleEmailAuth(email);

    if (result.isNewUser) {
      res.status(201).json({
        success: true,
        message:
          "Registration successful. Check your email for verification code.",
        data: {
          user: result.user,
          isNewUser: true,
          activation_Token: result.activation_Token,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Logged in successfully.",
        data: {
          user: result.user,
          isNewUser: false,
          activation_Token: result.activation_Token,
        },
      });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const verifyOtp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_Token, activationCode } = req.body;
    if (!activation_Token || !activationCode)
      return next(new ErrorResponse("Token and code required", 400));

    const result = await AuthService.verifyOtp(
      activation_Token,
      activationCode
    );
    res.status(200).json({
      success: true,
      message: result.wasActivated
        ? "Account activated and logged in."
        : "Logged in.",
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        wasActivated: result.wasActivated,
      },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Since you're not storing tokens in DB, we'll use token blacklisting
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"] as string;

    if (!accessToken && !refreshToken) {
      return next(new ErrorResponse("No tokens provided", 400));
    }

    // Add tokens to blacklist (you'll need to implement this)
    if (accessToken) {
      await AuthService.blacklistToken(accessToken);
    }
    if (refreshToken) {
      await AuthService.blacklistToken(refreshToken);
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

export { authenticateByEmail, verifyOtp, logout };