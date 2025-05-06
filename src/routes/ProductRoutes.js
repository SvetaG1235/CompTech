import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.post('/seed', ProductController.seed);
router.get('/api', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);
router.get('/grouped', ProductController.getProductsGrouped);
router.get('/category/:category', ProductController.getByCategory);
router.get('/:id', ProductController.getProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.showProductsPage);

export default router;