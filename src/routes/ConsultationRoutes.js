import express from 'express';
import ConsultationController from '../controllers/ConsultationController.js';

const router = express.Router();

router.get('/', ConsultationController.showConsForm); 
router.post('/', ConsultationController.create);    

export default router;