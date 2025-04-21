import express from 'express';
import consultationController from '../controllers/ConsultationController.js';

const router = express.Router();

router.get('/consultation', consultationController.showConsForm);

export default router;