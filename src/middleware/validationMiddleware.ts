import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../utils/response.util';

/**
 * Middleware for validating request data
 * Uses express-validator for validation
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return ApiResponse.error(
      res, 
      'Validation failed', 
      400, 
      errors.array()
    );
  }
  
  next();
};