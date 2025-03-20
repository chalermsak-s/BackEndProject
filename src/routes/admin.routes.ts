import express, { Request, Response } from 'express';
import { AdminService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();
const adminService = new AdminService();
const authMiddleware = new AuthMiddleware();

router.get('/dashboard', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.adminId;
      
      if (!adminId) {
        return ApiResponse.error(res, 'Admin ID is required', 400);
      }
      
      const dashboardSummary = await adminService.getDashboardSummary(adminId);
      return ApiResponse.success(res, dashboardSummary, 'Dashboard summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch dashboard summary', 500, error);
    }
  }
);

router.get('/advisors/summary', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const advisorSummary = await adminService.getAdvisorSummaryWithPagination(page, limit);
      return ApiResponse.success(res, advisorSummary, 'Advisor summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch advisor summary', 500, error);
    }
  }
);

router.get('/appointments/summary', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const appointmentSummary = await adminService.getAppointmentSummaryByStatus();
      return ApiResponse.success(res, appointmentSummary, 'Appointment summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointment summary', 500, error);
    }
  }
);

router.post('/assign-advisor', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  [
    body('studentId').isInt().withMessage('Student ID must be an integer'),
    body('advisorId').isInt().withMessage('Advisor ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.adminId;
      const { studentId, advisorId } = req.body;
      
      if (!adminId) {
        return ApiResponse.error(res, 'Admin ID is required', 400);
      }
      
      if (!studentId || !advisorId) {
        return ApiResponse.error(res, 'Student ID and Advisor ID are required', 400);
      }
      
      const result = await adminService.assignAdvisorToStudent(
        parseInt(studentId),
        parseInt(advisorId),
        adminId
      );
      
      return ApiResponse.success(res, result, 'Advisor assigned successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to assign advisor', 500, error);
    }
  }
);

router.get('/search/students', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return ApiResponse.error(res, 'Search query is required', 400);
      }
      
      const students = await adminService.searchStudents(query);
      return ApiResponse.success(res, students, 'Students fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to search students', 500, error);
    }
  }
);

router.get('/search/advisors', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return ApiResponse.error(res, 'Search query is required', 400);
      }
      
      const advisors = await adminService.searchAdvisors(query);
      return ApiResponse.success(res, advisors, 'Advisors fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to search advisors', 500, error);
    }
  }
);

router.get('/logs', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.adminId;
      
      if (!adminId) {
        return ApiResponse.error(res, 'Admin ID is required', 400);
      }
      
      const logs = await adminService.getAdminLogs(adminId);
      return ApiResponse.success(res, logs, 'Admin logs fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch admin logs', 500, error);
    }
  }
);

export default router;