import { Response, NextFunction } from 'express';
import { z } from 'zod';
import ErrorResponse from '../utils/ErroResponse';
import { AuthRequest } from './interface';

const updateUserProfileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .optional(),
  
  phoneNumber: z.string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number format')
    .optional(),
  
  dateOfBirth: z.string()
    .refine((val) => {
      try {
        const date = new Date(val);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    }, 'Invalid date format')
    .transform((str) => new Date(str))
    .optional(),

  profileImage: z.string()
    .url('Profile image must be a valid URL')
    .optional()
}).refine((data) => {
  const keys = Object.keys(data);
  return keys.length > 0;
}, {
  message: "At least one field must be provided for update"
});


export const validateUpdateProfile = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = updateUserProfileSchema.safeParse(req.body);
    
    if (!result.success) {
      return next(new ErrorResponse(`Validation failed`, 500));
    }
    req.body = result.data;
    next();
    
  } catch (error) {
    return next(new ErrorResponse('Validation error occurred', 500));
  }
};
