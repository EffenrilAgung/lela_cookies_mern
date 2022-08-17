import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/UserController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
