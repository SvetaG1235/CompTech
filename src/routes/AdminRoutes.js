import express from 'express';
import AdminController from '../controllers/AdminController.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.use(isAdmin);

router.get('/dashboard', AdminController.showDashboard.bind(AdminController));
router.get('/products', AdminController.getProducts.bind(AdminController));
router.post('/products', AdminController.createProduct.bind(AdminController));
router.put('/products/:id', AdminController.updateProduct.bind(AdminController));
router.delete('/products/:id', AdminController.deleteProduct.bind(AdminController));

router.get('/master-requests', AdminController.getMasterRequests.bind(AdminController));
router.put('/master-requests/bulk', AdminController.bulkUpdateMasterRequests.bind(AdminController));

router.get('/repair-requests', AdminController.getRepairRequests.bind(AdminController));

router.get('/consultations', AdminController.getConsultations.bind(AdminController));

router.get('/api/stats', AdminController.getStats.bind(AdminController));
router.get('/api/master-requests', AdminController.getMasterRequestsAPI.bind(AdminController));
router.get('/api/consultations', AdminController.getConsultationsAPI.bind(AdminController));
router.get('/api/products', AdminController.getProductsAPI.bind(AdminController));

export default router;