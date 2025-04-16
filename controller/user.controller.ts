import { sendEmail } from "./../service/SendMail";
import { prisma } from "../server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
import ErrorResponse from "../utils/ErroResponse";

interface UserData {
  name: string;
  email: string;
  phoneNumber: bigint;
  gender?: string | null;
  password: string;
}

interface ActivationRequest extends Request {
  body: {
    activationToken: string;
    activationCode: string;
  };
}

interface ResetPasswordRequest extends Request {
  body: {
    token: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  };
}

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

interface ActivationPayload {
  user: UserData;
  activationCode: string;
}

interface ForgotPasswordPayload {
  user: UserData;
  otp: string;
}

const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phoneNumber, role, password } = req.body;

  if (!name || !email || !phoneNumber || !role || !password) {
    console.log("data: ", name, email, phoneNumber, role, password);
    return next(new ErrorResponse("Incorrect data", 400));
  }

  try {
    let userExist = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });

    if (userExist) {
      if (userExist.email === email) {
        return next(new ErrorResponse("Email already exists", 409));
      }
      return next(new ErrorResponse("PhoneNumber already exists", 409));
    }
    //hash new Password
    const hashedPassword = await bcrypt.hash(password, 12);
    // creating new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        role,
        password: hashedPassword,
      },
    });

    const activationToken = await createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const activation_Token = activationToken.token;

    sendEmail(email, activationCode, "Verify Email", "verificationmail", name);

    res.status(201).json({ activationToken: activation_Token });
  } catch (error) {
    return next(error);
  }
};

//create token
const createActivationToken = async (user: UserData) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  //fix for bigint
  const tokenData = {
    ...user,
    phoneNumber: user.phoneNumber.toString(),
  };

  const token = jwt.sign(
    {
      user: tokenData,
      activationCode,
    },
    process.env.ACTIVATION_TOKEN!,
    {
      expiresIn: "48h",
    }
  );
  return { token, activationCode };
};

//activate user
const activateUser = async (
  req: ActivationRequest,
  res: Response,
  next: NextFunction
) => {
  const { activationToken, activationCode } = req.body;

  try {
    const decoded = jwt.verify(
      activationToken,
      process.env.ACTIVATION_TOKEN!
    ) as ActivationPayload;

    //if the provided activation code matches the one in the token
    if (decoded.activationCode !== activationCode) {
      return next(new ErrorResponse("Activation code is invalid", 400));
    }

    //Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.user.email,
      },
    });

    if (!user) {
      return next(new ErrorResponse("User not Exist", 404));
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: decoded.user.email,
      },
      data: {
        isActivated: true,
      },
    });

    res.status(200).json({
      message: "User activated successfully",
      user: {
        ...updatedUser,
        phoneNumber: updatedUser.phoneNumber.toString(),
      },
    });
  } catch (error) {
    return next(new ErrorResponse("Activation failed", 500));
  }
};

// OTP Verification
const verifyOTP: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, token } = req.body;

    const decoded = jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_SECRET!
    ) as ForgotPasswordPayload;

    //check if the otp matches
    if (decoded.otp !== otp) {
      return next(new ErrorResponse("Invalid or expired OTP", 400));
    }

    res.status(200).json({
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    return next(new ErrorResponse("OTP Verification failed", 500));
  }
};

//login User
const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  //if email and password not found
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExist) {
      return next(
        new ErrorResponse("User with these deatils not available", 401)
      );
    }

    //if user found and but not activated
    if (!userExist.isActivated) {
      return next(
        new ErrorResponse(
          "User is not activated. Please activate your account. check your mail",
          403
        )
      );
    }

    //check if password is same as stored password
    const checkPassword = await bcrypt.compare(password, userExist.password);

    //if password is wrong
    if (!checkPassword) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Genrate Access Token
    const accessToken = jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    // Genrate Refresh Token
    const refreshToken = jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    return next(new ErrorResponse("Login failed", 500));
  }
};

//get LoggedIn User for get currentsession
const loggedInUser: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    const userExist = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!userExist) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        phoneNumber: userExist.phoneNumber.toString(),
        gender: userExist.gender,
        role: userExist.role,
        isActivated: userExist.isActivated,
      },
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to retrieve user", 500));
  }
};

const ForgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorResponse("Please Provide Email", 400));
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExist) {
    return next(new ErrorResponse("User with Email id does not exist", 404));
  }

  if (!userExist.isActivated) {
    return next(
      new ErrorResponse("Email hasn't verified yet. Check your inbox", 400)
    );
  }

  const { token, otp } = await generateForgotPasswordToken(userExist);

  sendEmail(
    userExist.email,
    otp,
    "Reset Password",
    "forgotpassword",
    userExist.name
  );

  res
    .status(200)
    .json({ token: token, message: "Your Forgot password request successful" });
};

const generateForgotPasswordToken = async (user: UserData) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const tokenData = {
    ...user,
    phoneNumber: user.phoneNumber.toString(),
  };

  const fogretPasswordToken = jwt.sign(
    {
      user: tokenData,
      otp: otp,
    },
    process.env.FORGOT_PASSWORD_SECRET!,
    {
      expiresIn: "5m",
    }
  );

  return { token: fogretPasswordToken, otp };
};

// Reset Password
const ResetPassword: RequestHandler = async (
  req: ResetPasswordRequest,
  res: Response,
  next: NextFunction
) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token || !newPassword || !confirmPassword) {
    return next(
      new ErrorResponse("Missing token, password or confirm password", 400)
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_SECRET!
    ) as ForgotPasswordPayload;

    //hash new Password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //Update user's password in the database
    const updatedUser = await prisma.user.update({
      where: { email: decoded.user.email },
      data: { password: hashedPassword },
    });

    res.status(200).json({
      message: "Password Updated Successfully",
      user: {
        ...updatedUser,
        phoneNumber: updatedUser.phoneNumber.toString(),
      },
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to reset password", 500));
  }
};

const Logout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Set the cookie to expire immediately
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return next(new ErrorResponse("Failed to logout", 500));
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, gender, email } = req.body;

    if (!username || !gender || !email) {
      return next(new ErrorResponse("Incorrect data", 400));
    }

    const updateUser = await prisma.user.updateMany({
      where: {
        email: email,
      },
      data: {
        name: username,
        gender: gender,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log("error");
  }
};

export {
  registerUser,
  activateUser,
  loginUser,
  loggedInUser,
  ForgotPassword,
  ResetPassword,
  verifyOTP,
  Logout,
  updateProfile,
};
