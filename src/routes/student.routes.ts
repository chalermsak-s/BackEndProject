// Description: This file contains the routes for student-related operations.
// It includes routes for getting all students, searching for students, and getting a student by ID.
// It also includes middleware for authentication and authorization.

import express, { Request, Response } from 'express';
import { StudentService } from '../services';
import { AuthMiddleware } from '../middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';
import { ApiResponse } from '../utils/response.util';
import { ROLES } from '../utils/constants';
import { param, body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();
const studentService = new StudentService();
const authMiddleware = new AuthMiddleware();

router.get('/', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const students = await studentService.getAllStudents();
      return ApiResponse.success(res, students, 'Students fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch students', 500, error);
    }
  }
);

router.get('/search', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return ApiResponse.error(res, 'Search query is required', 400);
      }
      
      const students = await studentService.searchStudents(query);
      return ApiResponse.success(res, students, 'Students fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Search failed', 500, error);
    }
  }
);

router.get('/:id', 
  authMiddleware.protect,
  [
    param('id').isInt().withMessage('Student ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await studentService.getStudentById(studentId);
      
      if (!student) {
        return ApiResponse.error(res, 'Student not found', 404);
      }
      
      return ApiResponse.success(res, student, 'Student fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch student', 500, error);
    }
  }
);

router.post('/', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentData = req.body;
      const newStudent = await studentService.createStudent(studentData);
      return ApiResponse.success(res, newStudent, 'Student created successfully', 201);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to create student', 500, error);
    }
  }
);

router.post('/:id/profile-picture', 
  authMiddleware.protect, 
  [
    param('id').isInt().withMessage('Student ID must be an integer')
  ],
  validate,
  uploadProfilePicture,
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return ApiResponse.error(res, 'No file uploaded', 400);
      }
      
      const studentId = parseInt(req.params.id);
      
      // Check if user is admin or the student themselves
      if (req.user?.role !== 'Admin' && req.user?.studentId !== studentId) {
        return ApiResponse.error(res, 'Not authorized to update this profile', 403);
      }
      
      const updatedStudent = await studentService.updateProfilePicture(studentId, req.file);
      
      return ApiResponse.success(res, updatedStudent, 'Profile picture updated successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to upload profile picture', 500, error);
    }
  }
);

router.put('/:id', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  [
    param('id').isInt().withMessage('Student ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(req.params.id);
      const studentData = req.body;
      const updatedStudent = await studentService.updateStudent(studentId, studentData);
      
      if (!updatedStudent) {
        return ApiResponse.error(res, 'Student not found', 404);
      }
      
      return ApiResponse.success(res, updatedStudent, 'Student updated successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to update student', 500, error);
    }
  }
);

router.delete('/:id', 
  authMiddleware.protect, 
  authMiddleware.isAdmin,
  [
    param('id').isInt().withMessage('Student ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(req.params.id);
      await studentService.deleteStudent(studentId);
      return ApiResponse.success(res, null, 'Student deleted successfully', 204);
    } catch (error) {
      return ApiResponse.error(res, 'Failed to delete student', 500, error);
    }
  }
);

export default router;