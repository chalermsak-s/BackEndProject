import express from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import studentRoutes from './student.routes';
import advisorRoutes from './advisor.routes';
import adminRoutes from './admin.routes';
import feedbackRoutes from './feedback.routes';
import announcementRoutes from './announcement.routes';
import appointmentRoutes from './appointment.routes';
import departmentRoutes from './department.routes';
import { AuthMiddleware } from '../middleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/advisors', advisorRoutes);
router.use('/admins', adminRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/announcements', announcementRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/departments', departmentRoutes);

export default router;