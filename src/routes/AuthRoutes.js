import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;