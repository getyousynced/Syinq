import { verifyToken } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
  authenticateByEmail,
  logout,
  refreshAccessToken,
  verifyOtp,
} from "../controller/auth.controller";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User ID
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           description: User phone number
 *         name:
 *           type: string
 *           description: User full name
 *         isActivated:
 *           type: boolean
 *           description: Account activation status
 *         gender:
 *           type: string
 *           nullable: true
 *           enum: [Male, Female, Other]
 *           description: User gender
 *         profileImage:
 *           type: string
 *           nullable: true
 *           description: Profile image URL
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Date of birth
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Last login timestamp
 *         role:
 *           type: string
 *           enum: [Student, Driver, Admin]
 *           description: User role
 *     
 *     EmailAuthRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *           description: User email address
 *     
 *     NewUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Registration successful. Check your email for verification code."
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             isNewUser:
 *               type: boolean
 *               example: true
 *             activation_Token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     
 *     ExistingUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Logged in successfully."
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             isNewUser:
 *               type: boolean
 *               example: false
 *             activation_Token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     
 *     VerifyOtpRequest:
 *       type: object
 *       required:
 *         - activation_Token
 *         - activationCode
 *       properties:
 *         activation_Token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: Activation token received from email authentication
 *         activationCode:
 *           type: integer
 *           example: 123456
 *           description: 6-digit OTP code from email
 *     
 *     VerifyOtpResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Account activated and logged in."
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             accessToken:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             refreshToken:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             wasActivated:
 *               type: boolean
 *               example: true
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 *         statusCode:
 *           type: integer
 *           example: 400
 */

/**
 * @swagger
 * /api/v1/auth/authenticateUser:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate user by email
 *     description: |
 *       Register a new user or initiate login for existing user. Sends OTP to email.
 *       
 *       **Response Scenarios:**
 *       - **New User (201)**: User doesn't exist, creates new account and sends verification OTP
 *       - **Existing User (200)**: User exists, sends login OTP
 *       
 *       Both scenarios return an activation token and OTP is sent via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailAuthRequest'
 *           examples:
 *             newUser:
 *               summary: New user registration
 *               value:
 *                 email: "newuser@example.com"
 *             existingUser:
 *               summary: Existing user login
 *               value:
 *                 email: "existinguser@example.com"
 *     responses:
 *       200:
 *         description: Existing user - OTP sent for login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExistingUserResponse'
 *             examples:
 *               existingUser:
 *                 summary: Existing user login response
 *                 value:
 *                   success: true
 *                   message: "Logged in successfully."
 *                   data:
 *                     user:
 *                       id: "64f9b8c8e1234567890abcde"
 *                       email: "existinguser@example.com"
 *                       name: "John Doe"
 *                       isActivated: true
 *                       role: "Student"
 *                       phoneNumber: "+1234567890"
 *                       gender: "Male"
 *                       profileImage: "https://example.com/profile.jpg"
 *                       dateOfBirth: "1995-01-15"
 *                       lastLogin: "2025-09-20T12:00:00.000Z"
 *                     isNewUser: false
 *                     activation_Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       201:
 *         description: New user registered - OTP sent for verification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewUserResponse'
 *             examples:
 *               newUser:
 *                 summary: New user registration response
 *                 value:
 *                   success: true
 *                   message: "Registration successful. Check your email for verification code."
 *                   data:
 *                     user:
 *                       id: "64f9b8c8e1234567890abcdf"
 *                       email: "newuser@example.com"
 *                       name: null
 *                       isActivated: false
 *                       role: "Student"
 *                       phoneNumber: null
 *                       gender: null
 *                       profileImage: null
 *                       dateOfBirth: null
 *                       lastLogin: null
 *                     isNewUser: true
 *                     activation_Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Email is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingEmail:
 *                 summary: Missing email error
 *                 value:
 *                   success: false
 *                   message: "Email is required"
 *                   statusCode: 400
 *       403:
 *         description: Account suspended
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               suspendedAccount:
 *                 summary: Suspended account error
 *                 value:
 *                   success: false
 *                   message: "Your account is suspended. Contact support."
 *                   statusCode: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/authenticateUser", authenticateByEmail);

/**
 * @swagger
 * /api/v1/auth/verifyUser:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify OTP and complete authentication
 *     description: Verify the OTP sent to email and receive access/refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtpRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyOtpResponse'
 *       400:
 *         description: Bad request - Invalid token/OTP or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post('/verifyUser', verifyOtp);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout user
 *     description: Blacklist access and refresh tokens to logout user
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: "Logged out successfully"
 *       400:
 *         description: No tokens provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/logout", verifyToken, logout);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
