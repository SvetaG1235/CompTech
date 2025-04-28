import express from 'express';
import AdminController from '../controllers/AdminController.js';

const router = express.Router();

router.get('/products', AdminController.getProducts);
router.put('/master-requests/:id', AdminController.updateMasterRequest);
router.put('/consultations/:id', AdminController.updateConsultation);
router.get('/dashboard', AdminController.showdashboard);

export default router;