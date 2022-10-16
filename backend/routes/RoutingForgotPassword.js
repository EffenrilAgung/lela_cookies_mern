import express from 'express';
import {
  forgotPassword,
  resetPassword,
} from '../controllers/HandlePassword.js';
const router = express.Router();

router.put('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);

export default router;
