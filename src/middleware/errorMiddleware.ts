import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.util';

export class ErrorHandlerMiddleware {
  public handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error details for debugging
    console.error(`[${new Date().toISOString()}] Error:`, {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.user?.id
    });
    
    // In production, don't expose error details to clients
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message;
    
    return ApiResponse.error(
      res, 
      'Internal server error', 
      500, 
      errorMessage
    );
  };
}