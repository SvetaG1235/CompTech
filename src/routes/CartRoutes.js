import express from 'express';
import cartController from '../controllers/CartController.js';
import CartService from '../services/CartService.js';

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove/:productId', cartController.removeFromCart);
router.get('/count', (req, res) => {
    const count = CartService.getCartCount(req.session);
    res.json({ success: true, count });
});

export default router;