import { UserModel } from "../models/user.model";
import ErrorResponse from "../utils/ErroResponse";
import { randomInt } from "crypto";
import { sendEmail } from "../utils/SendMail";
import jwt from "jsonwebtoken";
import { UpdateUserCompleteProfileData } from "../interface/user.interface";

interface User {
  id: string;
  email: string;
  role: string;
  isActivated: boolean;
}

interface UserForOTP {
  id: string;
  email?: string;
  role?: string;
  isActivated?: boolean;
}

export class UserService {
  static async updateUserProfile(
    userId: string,
    data: UpdateUserCompleteProfileData
  ) {
    if (!userId) {
      throw new ErrorResponse("User ID is required", 400);
    }

    // Check if user Exists
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      throw new ErrorResponse("User not found", 404);
    }

    // Business validations
    if (existingUser.suspended) {
      throw new ErrorResponse("Account is suspended", 403);
    }

    if (!existingUser.isActivated) {
      throw new ErrorResponse("Account is not activated", 403);
    }

    // Validate phone number uniqueness
    if (
      data.phoneNumber &&
      data.phoneNumber !== existingUser.profile?.phoneNumber
    ) {
      const phoneExists = await UserModel.findByPhoneNumber(
        data.phoneNumber,
        userId
      );

      if (phoneExists) {
        throw new ErrorResponse("Phone number already exists", 400);
      }
    }

    // *** ADD COLLEGE EMAIL VALIDATION HERE ***
    if (data.collegeEmail) {
      const currentCollegeEmail = existingUser.collegeInfo?.email;

      // Only validate if the email is different from current one
      if (data.collegeEmail !== currentCollegeEmail) {
        const emailExists = await UserModel.findByCollegeEmail(
          data.collegeEmail,
          userId
        );

        if (emailExists) {
          throw new ErrorResponse("College email already exists", 400);
        }
      }
    }

    if (data.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(data.dateOfBirth);

      if (birthDate >= today) {
        throw new ErrorResponse("Date of birth must be in the past", 400);
      }

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        throw new ErrorResponse("User must be at least 18 years old", 400);
      }
    }

    return await UserModel.updateProfile(userId, data);
  }

  static async getUserProfile(userId: string) {
    if (!userId) {
      throw new ErrorResponse("User ID is required", 400);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    return user;
  }

  static async deleteUserProfile(userId: string) {
    if (!userId) {
      throw new ErrorResponse("User ID is required", 400);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    const deletedUser = await UserModel.deleteUserById(userId);

    return deletedUser;
  }

  static async addCollegeEmail(collegeEmail: string, userId: string) {
    if (!collegeEmail) {
      throw new ErrorResponse("College Email not present", 401);
    }

    if (!userId) {
      throw new ErrorResponse("User not authenticated", 401);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    const userEmail = await UserModel.findByCollegeEmail(collegeEmail);

    if (userEmail) {
      throw new ErrorResponse("Email already exist", 400);
    }

    const updatedUser = await UserModel.addCollegeEmail(userId, collegeEmail);

    const { otp, token: activation_Token } = this.createOtp(
      updatedUser as UserForOTP
    );

    sendEmail(collegeEmail, otp, "Verify Email", "verificationmail");

    return { updatedUser, activation_Token };
  }

  static createOtp(user: UserForOTP) {
    const otp = randomInt(100000, 999999);
    const token = jwt.sign({ user, otp }, process.env.ACTIVATION_TOKEN!, {
      expiresIn: "48h",
    });
    return { otp, token };
  }

  static async verifyOtp(activation_Token: string, activationCode: number) {
    let decoded;
    try {
      decoded = jwt.verify(activation_Token, process.env.ACTIVATION_TOKEN!) as {
        user: UserForOTP;
        otp: number;
      };
    } catch {
      throw new ErrorResponse("Activation token invalid or expired", 400);
    }
    if (decoded.otp !== activationCode)
      throw new ErrorResponse("Invalid OTP code", 400);

    if (!decoded.user.email) {
      throw new ErrorResponse("College email not found in token", 400);
    }

    const user = await UserModel.findByEmail(decoded.user.email!);
    if (!user) throw new ErrorResponse("User not found", 404);

    // activate email
    const updatedUser = await UserModel.verifyMail(decoded.user.email!);

    return {
      success: true,
      user: updatedUser,
      message: "College Email is Veirfied!",
    };
  }

  static async getCollegeEmail(userId: string) {
    if (!userId) {
      throw new ErrorResponse("User not authenticated", 401);
    }

    const collegeEmail = await UserModel.getCollegeEmail(userId);

    if (!collegeEmail) {
      throw new ErrorResponse("College Email id is present", 400);
    }

    return collegeEmail;
  }
}
