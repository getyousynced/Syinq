import { UpdateUserCompleteProfileData } from "../interface/user.interface";
import { prisma } from "../server";

export class UserModel {
  static async updateProfile(
    userId: string,
    data: UpdateUserCompleteProfileData
  ) {
    const profileData = {
      ...(data.name && { name: data.name }),
      ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
      ...(data.gender && { gender: data.gender }),
      ...(data.profileImage !== undefined && {
        profileImage: data.profileImage,
      }),
      ...(data.dateOfBirth && {
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      }),
    };

    // Only include fields that are actually provided and have values
    const collegeData: any = {};
    if (data.college) collegeData.college = data.college;
    if (data.course) collegeData.course = data.course;
    if (data.year !== undefined) collegeData.year = data.year;

    const result = await prisma.$transaction(async (tx) => {
      let updatedProfile = null;
      let updatedCollegeInfo = null;

      // Handle profile data
      if (Object.keys(profileData).length > 0) {
        updatedProfile = await tx.userProfile.upsert({
          where: { userId },
          create: {
            userId,
            name: profileData.name || "Unknown",
            phoneNumber:
              profileData.phoneNumber || `temp_${Date.now()}_${Math.random()}`,
            gender: profileData.gender || "Not specified",
            dateOfBirth: profileData.dateOfBirth || new Date("2000-01-01"),
            profileImage: profileData.profileImage,
          },
          update: {
            ...profileData,
            updated_at: new Date(),
          },
        });
      }

      // Only create/update college info if meaningful data exists
      const hasMeaningfulCollegeData =
        data.college || data.course || data.year !== undefined;

      if (hasMeaningfulCollegeData) {
        const existingCollegeInfo = await tx.collegeInfo.findUnique({
          where: { userId },
        });

        if (existingCollegeInfo) {
          // Update existing college info
          updatedCollegeInfo = await tx.collegeInfo.update({
            where: { userId },
            data: {
              ...collegeData,
              updated_at: new Date(),
            },
          });
        } else {
          // Create new college info with only meaningful data
          const createData: any = { userId };

          // Only add fields that are explicitly provided
          if (data.college) createData.college = data.college;
          if (data.course) createData.course = data.course;
          if (data.year !== undefined) createData.year = data.year;

          // Provide defaults ONLY for required fields that aren't provided
          if (!createData.college) createData.college = "";
          if (!createData.course) createData.course = "";
          if (createData.year === undefined) createData.year = 1;

          // NEVER set email field if not provided - let it be undefined/missing

          updatedCollegeInfo = await tx.collegeInfo.create({
            data: createData,
          });
        }
      }

      return { updatedProfile, updatedCollegeInfo };
    });

    return await this.findById(userId);
  }

  static async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActivated: true,
        suspended: true,
        created_at: true,
        updated_at: true,
        profile: {
          select: {
            name: true,
            phoneNumber: true,
            gender: true,
            profileImage: true,
            dateOfBirth: true,
          },
        },
        collegeInfo: {
          select: {
            college: true,
            course: true,
            year: true,
          },
        },
      },
    });
  }

  static async findByPhoneNumber(phoneNumber: string, excludeUserId?: string) {
    return await prisma.userProfile.findUnique({
      where: {
        phoneNumber,
        ...(excludeUserId && { NOT: { id: excludeUserId } }),
      },
    });
  }

  static async deleteUserById(userId: string) {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
