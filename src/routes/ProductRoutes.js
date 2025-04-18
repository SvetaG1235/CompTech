import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);
router.get('/:id', ProductController.getProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/grouped', ProductController.getProductsGrouped);
router.post('/seed', ProductController.seedProducts); 
router.get('/category/:category', ProductController.getByCategory); 

export default router;