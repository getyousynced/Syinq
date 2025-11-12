export interface UpdateUserCompleteProfileData {
  // UserProfile fields
  name?: string;
  phoneNumber?: string;
  gender?: string;
  profileImage?: string;
  dateOfBirth?: Date;

  // CollegeInfo fields
  college?: string;
  course?: string;
  year?: number;
}
