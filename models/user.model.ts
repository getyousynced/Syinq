import { UpdateUserProfileData } from "../interface/user.interface";
import { prisma } from "../server";

export class UserModel {
  static async updateProfile(id: string, data: UpdateUserProfileData) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        college: true,
        phoneNumber: true,
        dateOfBirth: true,
        profileImage: true,
        gender: true,
        year: true,
        course: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    }); 
  }

  static async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        profileImage: true,
        gender: true,
        role: true,
        isActivated: true,
        suspended: true,
      },
    });
  }

  static async findByPhoneNumber(phoneNumber: string, excludeUserId?: string) {
    return await prisma.user.findUnique({
      where: {
        phoneNumber,
        ...(excludeUserId && { NOT: { id: excludeUserId } }),
      },
    });
  }
}
