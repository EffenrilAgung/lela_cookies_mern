import express from 'express';
const router = express.Router();
import { forgotpassword, resetPassword } from '../controllers/UserController';

router.put('/forgot-password', forgotpassword);
router.put('/reset-password/:id/:token', resetPassword);
