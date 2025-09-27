import { AuthModel } from "../models/auth.models";
import ErrorResponse from "../utils/ErroResponse";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import { sendEmail } from "../utils/SendMail";

interface User {
  id: string;
  email: string;
  role: string;
  isActivated: boolean;
}

// AuthService.ts
export class AuthService {
  // TODO: USE REDIS FOR PRODUCTION
  // Simple in-memory blacklist
  private static blacklistedTokens = new Set<string>();

  static async handleEmailAuth(email: string) {
    if (!email) throw new ErrorResponse("Email is not present", 404);

    let user = await AuthModel.findByEmail(email);
    const isNewUser = !user;

    if (!user) {
      user = await AuthModel.createUser(email);
    }

    if (user.suspended) {
      throw new ErrorResponse(
        "Your account is suspended. Contact support.",
        403
      );
    }

    const { otp, token: activation_Token } = this.createOtp(user);

    if (isNewUser) {
      sendEmail(email, otp, "Verify Email", "verificationmail");
    } else {
      sendEmail(email, otp, "Welcome Login", "verificationmail");
    }

    return { user, isNewUser, activation_Token };
  }

  static createOtp(user: User) {
    const otp = randomInt(100000, 999999);
    const token = jwt.sign({ user, otp }, process.env.ACTIVATION_TOKEN!, {
      expiresIn: "48h",
    });
    return { otp, token };
  }

  static generateAccessToken(user: User) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isActivated: user.isActivated,
        jti: `${user.id}-${Date.now()}`,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN! } as jwt.SignOptions
    );
  }

  static generateRefreshToken(user: User) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        jti: `${user.id}-${Date.now()}-refresh`,
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN! } as jwt.SignOptions
    );
  }

  static async verifyOtp(activation_Token: string, activationCode: number) {
    let decoded;
    try {
      decoded = jwt.verify(activation_Token, process.env.ACTIVATION_TOKEN!) as {
        user: User;
        otp: number;
      };
    } catch {
      throw new ErrorResponse("Activation token invalid or expired", 400);
    }
    if (decoded.otp !== activationCode)
      throw new ErrorResponse("Invalid OTP code", 400);

    const user = await AuthModel.findByEmail(decoded.user.email);
    if (!user) throw new ErrorResponse("User not found", 404);

    // Only activate if not already activated
    const wasActivated = !user.isActivated;
    const updatedUser = wasActivated
      ? await AuthModel.activateUser(user.id)
      : await AuthModel.updateLastLogin(user.id);

    return {
      user: updatedUser,
      accessToken: this.generateAccessToken(updatedUser),
      refreshToken: this.generateRefreshToken(updatedUser),
      wasActivated,
    };
  }

  static async blacklistToken(token: string) {
    const decoded = jwt.decode(token) as any;
    const tokenId = decoded?.jti || token;

    this.blacklistedTokens.add(tokenId);
    return true;
  }

  static isTokenBlacklisted(token: string): boolean {
    const decoded = jwt.decode(token) as any;
    const tokenId = decoded?.jti || token;
    return this.blacklistedTokens.has(tokenId);
  }
}
