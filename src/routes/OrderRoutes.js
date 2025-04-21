import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);

export default router;