// Description: This file defines the routes for the user-related endpoints in the application.
// It imports the necessary modules and sets up the routes for students and advisors.

import express from 'express';

import studentRoutes from './studentRoutes';
import advisorRoutes from './advisorRoutes';

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/advisors', advisorRoutes);

export default router;
