export interface UpdateUserProfileData {
  name: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;

  // College related
  college: string;
  course: string;
  year: number;
}