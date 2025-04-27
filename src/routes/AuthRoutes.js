import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

// Роуты аутентификации
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Роуты регистрации
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

export default router;