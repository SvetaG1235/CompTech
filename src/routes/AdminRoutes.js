import express from 'express';
import AdminController from '../controllers/AdminController.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.use(isAdmin);

router.get('/dashboard', AdminController.showDashboard);

router.get('/products', AdminController.getProducts);
router.post('/products', AdminController.createProduct);
router.put('/products/:id', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);

router.get('/master-requests', AdminController.getMasterRequests);
router.put('/master-requests/bulk', AdminController.bulkUpdateMasterRequests);

router.get('/consultations', AdminController.getConsultations);

router.get('/api/stats', AdminController.getStats);

router.get('/api/products', AdminController.getProductsApi);
router.get('/api/master-requests', AdminController.getMasterRequestsApi);
router.get('/api/consultations', AdminController.getConsultationsApi);

export default router;