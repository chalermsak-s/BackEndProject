import express, { Request, Response } from 'express';
import { DepartmentService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { param } from 'express-validator';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();
const departmentService = new DepartmentService();
const authMiddleware = new AuthMiddleware();

router.get('/', 
  authMiddleware.authenticate,
  async (req: Request, res: Response) => {
    try {
      const departments = await departmentService.getAllDepartments();
      return ApiResponse.success(res, departments, 'Departments fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch departments', 500, error);
    }
  }
);

router.get('/:id', 
  authMiddleware.authenticate,
  [
    param('id').isInt().withMessage('Department ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const departmentId = parseInt(req.params.id);
      const department = await departmentService.getDepartmentById(departmentId);
      
      if (!department) {
        return ApiResponse.error(res, 'Department not found', 404);
      }
      
      return ApiResponse.success(res, department, 'Department fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch department', 500, error);
    }
  }
);

router.get('/degrees/all', 
  authMiddleware.authenticate,
  async (req: Request, res: Response) => {
    try {
      const degrees = await departmentService.getAllDegrees();
      return ApiResponse.success(res, degrees, 'Degrees fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch degrees', 500, error);
    }
  }
);

router.get('/degrees/:id', 
  authMiddleware.authenticate,
  [
    param('id').isInt().withMessage('Degree ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const degreeId = parseInt(req.params.id);
      const degree = await departmentService.getDegreeById(degreeId);
      
      if (!degree) {
        return ApiResponse.error(res, 'Degree not found', 404);
      }
      
      return ApiResponse.success(res, degree, 'Degree fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch degree', 500, error);
    }
  }
);

router.get('/academic-positions/all', 
  authMiddleware.authenticate,
  async (req: Request, res: Response) => {
    try {
      const academicPositions = await departmentService.getAllAcademicPositions();
      return ApiResponse.success(res, academicPositions, 'Academic positions fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch academic positions', 500, error);
    }
  }
);

router.get('/academic-positions/:id', 
  authMiddleware.authenticate,
  [
    param('id').isInt().withMessage('Academic position ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const academicPositionId = parseInt(req.params.id);
      const academicPosition = await departmentService.getAcademicPositionById(academicPositionId);
      
      if (!academicPosition) {
        return ApiResponse.error(res, 'Academic position not found', 404);
      }
      
      return ApiResponse.success(res, academicPosition, 'Academic position fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch academic position', 500, error);
    }
  }
);

export default router;