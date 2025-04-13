import express from 'express';
import { signup, login, logout } from '../controllers/userController.js';
import { loginFormValidator, registerFormValidator } from '../middlewares/formMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/signup',
  registerFormValidator,
  signup
);

router.post(
  '/login',
  loginFormValidator,
  login
);

router.get('/logout',authenticate, logout);

export default router;