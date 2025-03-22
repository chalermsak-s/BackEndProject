import express, { Request, Response } from 'express';
import { AppointmentService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { param, body, query } from 'express-validator';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();
const appointmentService = new AppointmentService();
const authMiddleware = new AuthMiddleware();

router.post('/request', 
  authMiddleware.protect, 
  authMiddleware.isStudent,
  [
    body('topic').notEmpty().withMessage('Topic is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('requestedDate').notEmpty().withMessage('Requested date is required')
      .isISO8601().withMessage('Requested date must be a valid date')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = req.user?.studentId;
      const { topic, description, requestedDate } = req.body;
      
      if (!studentId) {
        return ApiResponse.error(res, 'Student ID is required', 400);
      }
      
      const appointment = await appointmentService.requestAppointment(
        studentId,
        topic,
        description,
        new Date(requestedDate)
      );
      
      return ApiResponse.success(res, appointment, 'Appointment requested successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to request appointment', 500, error);
    }
  }
);

router.get('/', 
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
      
      const appointments = await appointmentService.getAllAppointmentsWithPagination(page, limit);
      return ApiResponse.success(res, appointments, 'Appointments fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointments', 500, error);
    }
  }
);

router.get('/:id', 
  authMiddleware.protect,
  [
    param('id').isInt().withMessage('Appointment ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const appointment = await appointmentService.getAppointmentById(appointmentId);
      
      if (!appointment) {
        return ApiResponse.error(res, 'Appointment not found', 404);
      }
      
      // Check permissions
      if (
        req.user?.role !== ROLES.ADMIN && 
        !(req.user?.role === ROLES.STUDENT && req.user.studentId === appointment.student_id) &&
        !(req.user?.role === ROLES.ADVISOR && req.user.advisorId === appointment.advisor_id)
      ) {
        return ApiResponse.error(res, 'Insufficient permissions', 403);
      }
      
      return ApiResponse.success(res, appointment, 'Appointment fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointment', 500, error);
    }
  }
);

router.get('/student/:studentId', 
  authMiddleware.protect,
  [
    param('studentId').isInt().withMessage('Student ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(req.params.studentId);
      
      // Check permissions
      if (
        req.user?.role !== ROLES.ADMIN && 
        !(req.user?.role === ROLES.STUDENT && req.user.studentId === studentId) &&
        !(req.user?.role === ROLES.ADVISOR)
      ) {
        return ApiResponse.error(res, 'Insufficient permissions', 403);
      }
      
      const appointments = await appointmentService.getAppointmentsByStudentId(studentId);
      return ApiResponse.success(res, appointments, 'Appointments fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointments', 500, error);
    }
  }
);

router.get('/advisor/:advisorId', 
  authMiddleware.protect,
  [
    param('advisorId').isInt().withMessage('Advisor ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const advisorId = parseInt(req.params.advisorId);
      
      // Check permissions
      if (
        req.user?.role !== ROLES.ADMIN && 
        !(req.user?.role === ROLES.ADVISOR && req.user?.advisorId === advisorId)
      ) {
        return ApiResponse.error(res, 'Insufficient permissions', 403);
      }
      
      const appointments = await appointmentService.getAppointmentsByAdvisorId(advisorId);
      return ApiResponse.success(res, appointments, 'Appointments fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointments', 500, error);
    }
  }
);

router.patch('/:id/date', 
  authMiddleware.protect, 
  authMiddleware.isAdvisor,
  [
    param('id').isInt().withMessage('Appointment ID must be an integer'),
    body('requestedDate').notEmpty().withMessage('Requested date is required')
      .isISO8601().withMessage('Requested date must be a valid date')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const advisorId = req.user?.advisorId;
      const { requestedDate } = req.body;
      
      if (!advisorId) {
        return ApiResponse.error(res, 'Advisor ID is required', 400);
      }
      
      const appointment = await appointmentService.updateAppointmentDate(
        appointmentId,
        advisorId,
        new Date(requestedDate)
      );
      
      return ApiResponse.success(res, appointment, 'Appointment date updated successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to update appointment date', 500, error);
    }
  }
);

router.patch('/:id/confirm', 
  authMiddleware.protect, 
  authMiddleware.isStudent,
  [
    param('id').isInt().withMessage('Appointment ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const studentId = req.user?.studentId;
      
      if (!studentId) {
        return ApiResponse.error(res, 'Student ID is required', 400);
      }
      
      const appointment = await appointmentService.confirmAppointment(appointmentId, studentId);
      return ApiResponse.success(res, appointment, 'Appointment confirmed successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to confirm appointment', 500, error);
    }
  }
);

router.get('/status/all', 
  authMiddleware.protect,
  async (req: Request, res: Response) => {
    try {
      const statuses = await appointmentService.getAllStatusAppointments();
      return ApiResponse.success(res, statuses, 'Status appointments fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch status appointments', 500, error);
    }
  }
);

router.get('/summary/all', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const summary = await appointmentService.getAppointmentsSummary();
      return ApiResponse.success(res, summary, 'Appointment summary fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch appointment summary', 500, error);
    }
  }
);

export default router;