import { NextFunction, Request, RequestHandler, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../interface/auth.interace";

const updateUserProfile: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const updateData = req.body;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const updatedUser = await UserService.updateUserProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const user = await UserService.getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const deleteUserProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const userDeleted = await UserService.deleteUserProfile(userId);

    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
      data: userDeleted,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const addCollegeEmail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeEmail } = req.body;

    if (!collegeEmail) {
      return next(new ErrorResponse("College Email not present", 401));
    }

    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const userUpdated = await UserService.addCollegeEmail(collegeEmail, userId);

    res.status(200).json({
      success: true,
      message: "College email id added  successfully",
      data: userUpdated,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const verifyOtp: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activation_Token, activationCode } = req.body;
    if (!activation_Token || !activationCode)
      return next(new ErrorResponse("Token and code required", 400));

    const result = await UserService.verifyOtp(
      activation_Token,
      activationCode
    );

    res.status(200).json({
      success: true,
      message: "Mail Verified",
      data: result.user,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const getCollegeEmail: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const collegeEmail = await UserService.getCollegeEmail(userId);

    res.status(200).json({
      success: true,
      message: "College Email is retrived!",
      mail: collegeEmail,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

export {
  updateUserProfile,
  getProfile,
  deleteUserProfile,
  addCollegeEmail,
  verifyOtp,
  getCollegeEmail
};
