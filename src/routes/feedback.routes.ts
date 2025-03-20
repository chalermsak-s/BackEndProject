import express, { Request, Response } from 'express';
import { FeedbackService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { param, body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();
const feedbackService = new FeedbackService();
const authMiddleware = new AuthMiddleware();

router.post('/advisor-to-student', 
  authMiddleware.protect, 
  authMiddleware.isAdvisor,
  [
    body('studentId').isInt().withMessage('Student ID must be an integer'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const advisorId = req.user?.advisorId;
      const { studentId, message } = req.body;
      
      if (!advisorId) {
        return ApiResponse.error(res, 'Advisor ID is required', 400);
      }
      
      const feedback = await feedbackService.createAdvisorFeedback(
        advisorId,
        parseInt(studentId),
        message
      );
      
      return ApiResponse.success(res, feedback, 'Feedback created successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to create feedback', 500, error);
    }
  }
);

router.post('/student-to-advisor', 
  authMiddleware.protect, 
  authMiddleware.isStudent,
  [
    body('advisorId').isInt().withMessage('Advisor ID must be an integer'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = req.user?.studentId;
      const { advisorId, message } = req.body;
      
      if (!studentId) {
        return ApiResponse.error(res, 'Student ID is required', 400);
      }
      
      const feedback = await feedbackService.createStudentFeedback(
        studentId,
        parseInt(advisorId),
        message
      );
      
      return ApiResponse.success(res, feedback, 'Feedback created successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to create feedback', 500, error);
    }
  }
);

router.get('/conversation/:senderId/:receiverId', 
  authMiddleware.protect,
  [
    param('senderId').isInt().withMessage('Sender ID must be an integer'),
    param('receiverId').isInt().withMessage('Receiver ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const senderId = parseInt(req.params.senderId);
      const receiverId = parseInt(req.params.receiverId);
      
      // Check permissions
      if (
        req.user?.role === ROLES.ADMIN ||
        (req.user?.role === ROLES.ADVISOR && req.user?.advisorId === senderId) ||
        (req.user?.role === ROLES.ADVISOR && req.user?.advisorId === receiverId) ||
        (req.user?.role === ROLES.STUDENT && req.user?.studentId === senderId) ||
        (req.user?.role === ROLES.STUDENT && req.user?.studentId === receiverId)
      ) {
        const feedbacks = await feedbackService.getFeedbackConversation(senderId, receiverId);
        return ApiResponse.success(res, feedbacks, 'Feedback conversation fetched successfully');
      }
      
      return ApiResponse.error(res, 'Insufficient permissions', 403);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch feedback conversation', 500, error);
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
        req.user?.role === ROLES.ADMIN ||
        (req.user?.role === ROLES.ADVISOR && req.user?.advisorId === advisorId)
      ) {
        const feedbacks = await feedbackService.getAdvisorFeedbacks(advisorId);
        return ApiResponse.success(res, feedbacks, 'Advisor feedbacks fetched successfully');
      }
      
      return ApiResponse.error(res, 'Insufficient permissions', 403);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch advisor feedbacks', 500, error);
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
        req.user?.role === ROLES.ADMIN ||
        (req.user?.role === ROLES.STUDENT && req.user?.studentId === studentId) ||
        (req.user?.role === ROLES.ADVISOR && req.user?.advisorId) // Allow student's advisor
      ) {
        const feedbacks = await feedbackService.getStudentFeedbacks(studentId);
        return ApiResponse.success(res, feedbacks, 'Student feedbacks fetched successfully');
      }
      
      return ApiResponse.error(res, 'Insufficient permissions', 403);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch student feedbacks', 500, error);
    }
  }
);

export default router;