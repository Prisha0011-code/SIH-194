import express from 'express';
import { signup, login, updateProfile } from '../controllers/authController.js';
import { getTasks, submitTasks, updateTaskStatus, rescheduleTasks } from '../controllers/taskController.js';
import { balanceDiet, verifyDiet } from '../controllers/dietController.js';

const router = express.Router();

// Middleware Mock to simulate JWT verification
const authMiddleware = (req, res, next) => {
  // Pass along mock user for local execution
  req.user = { id: 1 };
  next();
};

// Auth & Profiling Endpoints
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.patch('/users/profile', authMiddleware, updateProfile);

// Dynamic Task Management Endpoints
router.get('/tasks', authMiddleware, getTasks);
router.post('/tasks', authMiddleware, submitTasks);
router.patch('/tasks/:id/status', authMiddleware, updateTaskStatus);
router.post('/schedule/reschedule', authMiddleware, rescheduleTasks);

// Diet Engine & Role-Based AI Verification Endpoints
router.post('/diet/balance', authMiddleware, balanceDiet);
router.post('/diet/verify', authMiddleware, verifyDiet);

export default router;