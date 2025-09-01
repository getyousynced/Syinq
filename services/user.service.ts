import { UpdateUserProfileData } from "../interface/user.interface";
import { UserModel } from "../models/user.model";
import ErrorResponse from "../utils/ErroResponse";

export class UserService {
  static async updateUserProfile(userId: string, data: UpdateUserProfileData) {
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
    if (data.phoneNumber && data.phoneNumber !== existingUser.phoneNumber) {
      const phoneExists = await UserModel.findByPhoneNumber(
        data.phoneNumber,
        userId
      );

      if (phoneExists) {
        throw new ErrorResponse("Phone number already exists", 400);
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
}
