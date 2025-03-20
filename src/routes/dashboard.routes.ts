import express, { Request, Response } from 'express';
import { DashboardService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { query } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();
const dashboardService = new DashboardService();
const authMiddleware = new AuthMiddleware();

router.get('/summary', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const summary = await dashboardService.getAdminDashboardSummary();
      return ApiResponse.success(res, summary, 'Dashboard summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch dashboard summary', 500, error);
    }
  }
);

router.get('/advisors', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const advisorSummary = await dashboardService.getAdvisorSummaryWithPagination(page, limit);
      return ApiResponse.success(res, advisorSummary, 'Advisor summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch advisor summary', 500, error);
    }
  }
);

router.get('/appointments', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const appointmentSummary = await dashboardService.getAppointmentSummaryByStatus();
      return ApiResponse.success(res, appointmentSummary, 'Appointment summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointment summary', 500, error);
    }
  }
);

export default router;