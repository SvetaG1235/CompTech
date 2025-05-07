import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

router.get('/', CartController.getCart);
router.get('/count', CartController.getCartCount);
router.post('/add/:productId', CartController.addToCart);
router.post('/update/:productId', CartController.updateCartItem);
router.post('/remove/:productId', CartController.removeFromCart);

export default router;