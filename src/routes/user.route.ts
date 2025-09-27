import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  addCollegeEmail,
  deleteUserProfile,
  getCollegeEmail,
  getProfile,
  updateUserProfile,
  verifyOtp,
} from "../controller/user.controller";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile and college information management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           nullable: true
 *           description: Full name of the user
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           description: Phone number (must be unique)
 *         gender:
 *           type: string
 *           nullable: true
 *           enum: [Male, Female, Other]
 *           description: User gender
 *         profileImage:
 *           type: string
 *           nullable: true
 *           format: uri
 *           description: Profile image URL
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Date of birth (must be 18+ years old)
 *     
 *     CollegeInfo:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *           description: College email address (must be unique)
 *         college:
 *           type: string
 *           nullable: true
 *           description: Name of the college/university
 *         course:
 *           type: string
 *           nullable: true
 *           description: Course/program of study
 *         year:
 *           type: integer
 *           nullable: true
 *           minimum: 1
 *           maximum: 8
 *           description: Current year of study
 *         verifyMail:
 *           type: boolean
 *           nullable: true
 *           description: College email verification status
 *     
 *     CompleteUserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User ID
 *         email:
 *           type: string
 *           format: email
 *           description: Primary email address
 *         role:
 *           type: string
 *           enum: [Student, Driver, Admin]
 *           description: User role
 *         isActivated:
 *           type: boolean
 *           description: Account activation status
 *         suspended:
 *           type: boolean
 *           description: Account suspension status
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *         collegeInfo:
 *           $ref: '#/components/schemas/CollegeInfo'
 *     
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the user
 *           example: "John Doe"
 *         phoneNumber:
 *           type: string
 *           description: Phone number (must be unique)
 *           example: "+1234567890"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           description: User gender
 *           example: "Male"
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: Profile image URL
 *           example: "https://example.com/profile.jpg"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth (must be 18+ years old)
 *           example: "1995-01-15"
 *         collegeEmail:
 *           type: string
 *           format: email
 *           description: College email address (must be unique)
 *           example: "john.doe@university.edu"
 *         college:
 *           type: string
 *           description: Name of the college/university
 *           example: "Stanford University"
 *         course:
 *           type: string
 *           description: Course/program of study
 *           example: "Computer Science"
 *         year:
 *           type: integer
 *           minimum: 1
 *           maximum: 8
 *           description: Current year of study
 *           example: 3
 *         verifyMail:
 *           type: boolean
 *           description: College email verification status
 *           example: false
 *     
 *     AddCollegeEmailRequest:
 *       type: object
 *       required:
 *         - collegeEmail
 *       properties:
 *         collegeEmail:
 *           type: string
 *           format: email
 *           description: College email address
 *           example: "student@university.edu"
 *     
 *     AddCollegeEmailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "College email id added successfully"
 *         data:
 *           type: object
 *           properties:
 *             updatedUser:
 *               $ref: '#/components/schemas/CollegeInfo'
 *             activation_Token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               description: Token for email verification
 *     
 *     VerifyEmailOtpRequest:
 *       type: object
 *       required:
 *         - activation_Token
 *         - activationCode
 *       properties:
 *         activation_Token:
 *           type: string
 *           description: Activation token received from add college email
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         activationCode:
 *           type: integer
 *           description: 6-digit OTP code sent to college email
 *           example: 123456
 *     
 *     CollegeEmailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "College Email is retrived!"
 *         mail:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               nullable: true
 *               example: "student@university.edu"
 *             verifyMail:
 *               type: boolean
 *               nullable: true
 *               example: true
 *     
 *     StandardSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *   put:
 *     tags: [User]
 *     summary: Update user profile
 *     description: |
 *       Update user profile information including personal details and college information.
 *       
 *       **Validations:**
 *       - Phone number must be unique across all users
 *       - College email must be unique across all users  
 *       - Date of birth must be in the past and user must be 18+ years old
 *       - User must be authenticated and account activated
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *           examples:
 *             completeProfile:
 *               summary: Complete profile update
 *               value:
 *                 name: "John Doe"
 *                 phoneNumber: "+1234567890"
 *                 gender: "Male"
 *                 profileImage: "https://example.com/profile.jpg"
 *                 dateOfBirth: "1995-01-15"
 *                 collegeEmail: "john.doe@university.edu"
 *                 college: "Stanford University"
 *                 course: "Computer Science"
 *                 year: 3
 *             partialUpdate:
 *               summary: Partial profile update
 *               value:
 *                 name: "Jane Smith"
 *                 phoneNumber: "+0987654321"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/CompleteUserProfile'
 *       400:
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               phoneExists:
 *                 summary: Phone number already exists
 *                 value:
 *                   success: false
 *                   message: "Phone number already exists"
 *                   statusCode: 400
 *               ageRestriction:
 *                 summary: Age restriction error
 *                 value:
 *                   success: false
 *                   message: "User must be at least 18 years old"
 *                   statusCode: 400
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Account not activated or suspended
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   
 *   get:
 *     tags: [User]
 *     summary: Get user profile
 *     description: Retrieve complete user profile information including personal and college details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CompleteUserProfile'
 *             examples:
 *               completeProfile:
 *                 summary: User with complete profile
 *                 value:
 *                   success: true
 *                   data:
 *                     id: "64f9b8c8e1234567890abcde"
 *                     email: "user@example.com"
 *                     role: "Student"
 *                     isActivated: true
 *                     suspended: false
 *                     created_at: "2025-09-01T10:00:00.000Z"
 *                     updated_at: "2025-09-20T12:00:00.000Z"
 *                     profile:
 *                       name: "John Doe"
 *                       phoneNumber: "+1234567890"
 *                       gender: "Male"
 *                       profileImage: "https://example.com/profile.jpg"
 *                       dateOfBirth: "1995-01-15"
 *                     collegeInfo:
 *                       email: "john.doe@university.edu"
 *                       college: "Stanford University"
 *                       course: "Computer Science"
 *                       year: 3
 *                       verifyMail: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put("/profile", verifyToken, updateUserProfile);
userRouter.get("/profile", verifyToken, getProfile);

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     tags: [User]
 *     summary: Delete user profile
 *     description: |
 *       Permanently delete user account and all associated data.
 *       
 *       **Warning:** This action is irreversible and will delete all user data including:
 *       - User profile information
 *       - College information
 *       - All associated ride offers and bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User profile deleted successfully"
 *                 data:
 *                   $ref: '#/components/schemas/CompleteUserProfile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/delete", verifyToken, deleteUserProfile);

/**
 * @swagger
 * /api/v1/user/addCollegeEmail:
 *   patch:
 *     tags: [User]
 *     summary: Add college email address
 *     description: |
 *       Add or update college email address and send OTP for verification.
 *       
 *       **Process:**
 *       1. Validates email uniqueness
 *       2. Updates college information 
 *       3. Sends 6-digit OTP to the provided email
 *       4. Returns activation token for verification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCollegeEmailRequest'
 *           examples:
 *             addCollegeEmail:
 *               summary: Add college email
 *               value:
 *                 collegeEmail: "student@university.edu"
 *     responses:
 *       200:
 *         description: College email added successfully, OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddCollegeEmailResponse'
 *       400:
 *         description: Bad request - Email already exists or missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               emailExists:
 *                 summary: Email already exists
 *                 value:
 *                   success: false
 *                   message: "Email already exist"
 *                   statusCode: 400
 *               missingEmail:
 *                 summary: Missing college email
 *                 value:
 *                   success: false
 *                   message: "College Email not present"
 *                   statusCode: 401
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.patch("/addCollegeEmail", verifyToken, addCollegeEmail);

/**
 * @swagger
 * /api/v1/user/verifyEmail:
 *   patch:
 *     tags: [User]
 *     summary: Verify college email with OTP
 *     description: |
 *       Verify college email address using OTP sent during addCollegeEmail process.
 *       
 *       **Process:**
 *       1. Validates activation token and OTP code
 *       2. Marks college email as verified
 *       3. Returns updated user information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailOtpRequest'
 *           examples:
 *             verifyEmail:
 *               summary: Verify college email
 *               value:
 *                 activation_Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 activationCode: 123456
 *     responses:
 *       200:
 *         description: College email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Mail Verified"
 *                 data:
 *                   $ref: '#/components/schemas/CollegeInfo'
 *       400:
 *         description: Bad request - Invalid token/OTP or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidOtp:
 *                 summary: Invalid OTP code
 *                 value:
 *                   success: false
 *                   message: "Invalid OTP code"
 *                   statusCode: 400
 *               expiredToken:
 *                 summary: Expired activation token
 *                 value:
 *                   success: false
 *                   message: "Activation token invalid or expired"
 *                   statusCode: 400
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.patch("/verifyEmail", verifyToken, verifyOtp);

/**
 * @swagger
 * /api/v1/user/getEmail:
 *   get:
 *     tags: [User]
 *     summary: Get college email information
 *     description: Retrieve college email address and verification status for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: College email information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollegeEmailResponse'
 *             examples:
 *               verifiedEmail:
 *                 summary: Verified college email
 *                 value:
 *                   success: true
 *                   message: "College Email is retrived!"
 *                   mail:
 *                     email: "student@university.edu"
 *                     verifyMail: true
 *               unverifiedEmail:
 *                 summary: Unverified college email
 *                 value:
 *                   success: true
 *                   message: "College Email is retrived!"
 *                   mail:
 *                     email: "student@university.edu"
 *                     verifyMail: false
 *               noEmail:
 *                 summary: No college email set
 *                 value:
 *                   success: true
 *                   message: "College Email is retrived!"
 *                   mail:
 *                     email: null
 *                     verifyMail: null
 *       400:
 *         description: College email not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
userRouter.get("/getEmail", verifyToken, getCollegeEmail);

export default userRouter;
