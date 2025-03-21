import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import studentRoutes from './studentRoutes';
import advisorRoutes from './advisorRoutes';
import adminRoutes from './adminRoutes';
import feedbackRoutes from './feedbackRoutes';
import announcementRoutes from './announcementRoutes';
import appointmentRoutes from './appointmentRoutes';
import departmentRoutes from './departmentRoutes';
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