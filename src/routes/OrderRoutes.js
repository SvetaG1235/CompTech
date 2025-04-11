import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

router.get('/', OrderController.getUserOrders);
router.post('/', OrderController.create);

export default router;