import express, { Request, Response } from 'express';
import { AuthService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';
import type { IRegisterRequest } from '../models';
import prisma from '../repository/prisma-client';


const router = express.Router();
const authService = new AuthService();
const authMiddleware = new AuthMiddleware();

router.post('/authenticate', 
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const user = await authService.findByUsername(username);
      
      if (!user) {
          return ApiResponse.error(res, "User doesn't exist", 401);
      }
      
      if (user.password === undefined || user.password === null) {
          return ApiResponse.error(res, "Password is required", 400);
      }
      
      const isPasswordCorrect = await authService.comparePassword(password, user.password);
      
      if (!isPasswordCorrect) {
          return ApiResponse.error(res, "Invalid credentials", 401);
      }
      
      const token = authService.generatetoken(user.id);
      const userRoleData = await prisma.user_role.findUnique({
        where: { id: user.user_role_id || 0 }
      });
      const role = userRoleData?.role_name || 'unknown';
      
      return ApiResponse.success(res, {
        access_token: token,
        user: {
          id: user.id,
          username: user.username,
          role: role,
          studentId: user.student_id,
          advisorId: user.advisor_id,
          adminId: user.admin_id
        }
      }, 'Authentication successful');
    } catch (error) {
        return ApiResponse.error(res, "Authentication failed", 500, error);
    }
});

router.post('/admin', 
  authMiddleware.protect, 
  authMiddleware.isAdmin, 
  async (req: Request, res: Response) => {
    return ApiResponse.success(res, null, 'You are an admin');
});

router.post('/register', 
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('roleId').isInt().withMessage('Role ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    const registerRequest: IRegisterRequest = req.body;
    
    try {
      const { username, password, roleId } = registerRequest;
      const responseUser = await authService.registerUser(username, password, roleId);
      
      const responseUserRoleData = await prisma.user_role.findUnique({
        where: { id: responseUser.user_role_id || 0 }
      });  
      return ApiResponse.success(res, {
          id: responseUser.id,
          username: responseUser.username,
          role: responseUserRoleData?.role_name || 'unknown'
      }, 'User registered successfully', 201);
    } catch (error) {
        return ApiResponse.error(res, 'Registration failed', 500, error);
    }
});

router.get('/me', 
  authMiddleware.protect, 
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
          return ApiResponse.error(res, "User not authenticated", 401);
      }
      
      const user = await authService.findByUserId(userId);
      
      if (!user) {
          return ApiResponse.error(res, "User not found", 404);
      }
      
      const userRoleData = await prisma.user_role.findUnique({
        where: { id: user.user_role_id || 0 }
      });
        
      return ApiResponse.success(res, {
          id: user.id,
          username: user.username,
          role: userRoleData?.role_name || 'unknown',
          studentId: user.student_id,
          advisorId: user.advisor_id,
          adminId: user.admin_id
      }, 'User information retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, "Failed to get user", 500, error);
    }
});

router.post('/update-password', 
  authMiddleware.protect,
  [
    body('password').notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { password } = req.body;
        
        if (!userId) {
            return ApiResponse.error(res, "User not authenticated", 401);
        }
        
        await authService.updatePassword(userId, password);
        
        return ApiResponse.success(res, null, "Password updated successfully");
    } catch (error) {
        return ApiResponse.error(res, "Failed to update password", 500, error);
    }  
});

export default router;