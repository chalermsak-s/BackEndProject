import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import prisma from '../repository/prisma-client';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  
  /**
   * Authenticate the user by validating the JWT token
   * Modified to store user info in req.user instead of req.body.user
   * This makes it compatible with role-checking middleware
   */
  async protect(req: Request, res: Response, next: NextFunction) {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: "You are not logged in! Please log in to get access" 
      });
    }
    
    try {
      const userInfo = await this.authService.getUserFromToken(token);
      
      if (!userInfo) {
        return res.status(401).json({ 
          status: 'error',
          message: "Invalid credentials" 
        });
      }
      
      // Get role from user_role_id
      const userRoleData = await prisma.user_role.findUnique({
        where: { id: userInfo.user_role_id || 0 }
      });
      
      // Store user data in req.user instead of req.body.user
      req.user = {
        id: userInfo.id,
        username: userInfo.username,
        role: userRoleData?.role_name as string,
        studentId: userInfo.student_id || undefined,
        advisorId: userInfo.advisor_id || undefined,
        adminId: userInfo.admin_id || undefined
      };
      
      next();
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "JWT_SECRET is not defined") {
        return res.status(500).json({ 
          status: 'error',
          message: "Internal Server Error" 
        });
      }
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication failed" 
      });
    }
  }

  /**
   * Check if the authenticated user is an admin
   */
  isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication required" 
      });
    }
    
    if (req.user.role === 'Admin') {
      return next();
    }
    
    return res.status(403).json({ 
      status: 'error',
      message: "Admin access required" 
    });
  }
  
  /**
   * Check if the authenticated user is an advisor
   */
  isAdvisor(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication required" 
      });
    }
    
    if (req.user.role === 'Advisor') {
      return next();
    }
    
    return res.status(403).json({ 
      status: 'error',
      message: "Advisor access required" 
    });
  }
  
  /**
   * Check if the authenticated user is a student
   */
  isStudent(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication required" 
      });
    }
    
    if (req.user.role === 'Student') {
      return next();
    }
    
    return res.status(403).json({ 
      status: 'error',
      message: "Student access required" 
    });
  }
  
  /**
   * Verify JWT token presence but don't enforce role restrictions
   * For endpoints that only need authentication, not authorization
   */
  authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      // Allow request to proceed without authentication for public routes
      return next();
    }
    
    try {
      // Use JWT directly since we don't have verifyToken in AuthService
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      req.user = {
        id: decoded.userId,
        username: '',  // Since we don't have full user details here
        role: undefined,
        studentId: undefined,
        advisorId: undefined,
        adminId: undefined
      };
      
      next();
    } catch (error) {
      // Allow request to proceed if token is invalid
      next();
    }
  }
}

// Add type definition to extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        role?: string;
        studentId?: number;
        advisorId?: number;
        adminId?: number;
      };
    }
  }
}