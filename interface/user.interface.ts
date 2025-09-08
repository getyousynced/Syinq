export interface UpdateUserCompleteProfileData {
  // UserProfile fields
  name?: string;
  phoneNumber?: string;
  gender?: string;
  profileImage?: string;
  dateOfBirth?: Date;

  // CollegeInfo fields
  collegeEmail?: string;
  verifyMail?: boolean;
  college?: string;
  course?: string;
  year?: number;
}
