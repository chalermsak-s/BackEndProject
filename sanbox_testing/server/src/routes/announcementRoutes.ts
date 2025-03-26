import express, { Request, Response } from 'express';
import { AnnouncementService } from '../services';
import { AuthMiddleware } from '../middleware';
import { uploadAnnouncementFile } from '../middleware/uploadMiddleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { param, body } from 'express-validator';
import { validate } from '../middleware/validationMiddleware';
import path from 'path';

const router = express.Router();
const announcementService = new AnnouncementService();
const authMiddleware = new AuthMiddleware();

router.post('/', 
  authMiddleware.protect, 
  authMiddleware.isAdvisor, 
  uploadAnnouncementFile,
  [
    body('topic').notEmpty().withMessage('Topic is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const advisorId = req.user?.advisorId;
      const { topic, description } = req.body;
      
      if (!advisorId) {
        return ApiResponse.error(res, 'Advisor ID is required', 400);
      }
      
      const announcement = await announcementService.createAnnouncement(
        advisorId,
        topic,
        description,
        req.file
      );
      
      return ApiResponse.success(res, announcement, 'Announcement created successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to create announcement', 500, error);
    }
  }
);

router.get('/:id', 
  authMiddleware.protect,
  [
    param('id').isInt().withMessage('Announcement ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const announcementId = parseInt(req.params.id);
      const announcement = await announcementService.getAnnouncementById(announcementId);
      
      if (!announcement) {
        return ApiResponse.error(res, 'Announcement not found', 404);
      }
      
      return ApiResponse.success(res, announcement, 'Announcement fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch announcement', 500, error);
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
      const announcements = await announcementService.getAnnouncementsByAdvisorId(advisorId);
      return ApiResponse.success(res, announcements, 'Announcements fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch announcements', 500, error);
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
        !(req.user?.role === ROLES.ADVISOR && req.user.advisorId)
      ) {
        return ApiResponse.error(res, 'Insufficient permissions', 403);
      }
      
      const announcements = await announcementService.getAnnouncementsForStudent(studentId);
      return ApiResponse.success(res, announcements, 'Announcements fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch announcements', 500, error);
    }
  }
);

router.delete('/:id', 
  authMiddleware.protect, 
  authMiddleware.isAdvisor,
  [
    param('id').isInt().withMessage('Announcement ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const announcementId = parseInt(req.params.id);
      const advisorId = req.user?.advisorId;
      
      if (!advisorId) {
        return ApiResponse.error(res, 'Advisor ID is required', 400);
      }
      
      // Check if announcement belongs to this advisor
      const announcement = await announcementService.getAnnouncementById(announcementId);
      
      if (!announcement) {
        return ApiResponse.error(res, 'Announcement not found', 404);
      }
      
      if (announcement.advisor_id !== advisorId) {
        return ApiResponse.error(res, 'You can only delete your own announcements', 403);
      }
      
      await announcementService.deleteAnnouncement(announcementId);
      return ApiResponse.success(res, null, 'Announcement deleted successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to delete announcement', 500, error);
    }
  }
);

router.get('/file/:filename', 
  authMiddleware.protect, 
  async (req: Request, res: Response) => {
    try {
      // Since we're now using S3 storage, we need to redirect to the file URL
      // instead of serving it from the local filesystem
      const filename = req.params.filename;

      return ApiResponse.error(res, 'Direct file downloads are not supported with S3 storage. Please use the file URL.', 400);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to download file', 500, error);
    }
  }
);

export default router;