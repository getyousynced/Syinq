import { NextFunction, Request, RequestHandler, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";
import { AuthRequest } from "../middlewares/interface";
import { UserService } from "../services/user.service";

const addUserData: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const userData = req.body;

    if(!userId){
      return new ErrorResponse("User not authenticated", 401);
    }

    

  } catch (error) {
    return new ErrorResponse(error.message, 500);
  }
}

const updateUserProfile: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const updateData = req.body;

    if (!userId) {
      throw new ErrorResponse("User not authenticated", 401);
    }

    const updatedUser = await UserService.updateUserProfile(
      userId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new ErrorResponse('User not authenticated', 401);
    }

    const user = await UserService.getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: user
    })

  } catch (error) {
    return next(new ErrorResponse(error.messgae, 500));
  }
}

export { updateUserProfile, getProfile };
