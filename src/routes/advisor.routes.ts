import express, { Request, Response } from 'express';
import { AdvisorService } from '../services';
import { AuthMiddleware } from '../middleware';
import { ApiResponse } from '../utils/response.util';
import { param } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const router = express.Router();
const advisorService = new AdvisorService();
const authMiddleware = new AuthMiddleware();

router.get('/', 
  authMiddleware.authenticate,
  async (req: Request, res: Response) => {
    try {
      const advisors = await advisorService.getAllAdvisors();
      return ApiResponse.success(res, advisors, 'Advisors fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch advisors', 500, error);
    }
  }
);

router.get('/:id', 
  authMiddleware.authenticate,
  [
    param('id').isInt().withMessage('Advisor ID must be an integer')
  ],
  validate,
  async (req: Request, res: Response) => {
    try {
      const advisorId = parseInt(req.params.id);
      const advisor = await advisorService.getAdvisorById(advisorId);

      if (!advisor) {
        return ApiResponse.error(res, 'Advisor not found', 404);
      }

      return ApiResponse.success(res, advisor, 'Advisor fetched successfully');
    } catch (error) {
      return ApiResponse.error(res, 'Failed to fetch advisor', 500, error);
    }
  }
);

export default router;