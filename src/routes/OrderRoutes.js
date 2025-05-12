import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();
const { showNewOrderForm, createOrder, getOrderDetails } = OrderController;

router.get('/new', OrderController.showNewOrderForm);
router.post('/',  OrderController.createOrder);
router.get('/:id', OrderController.getOrderDetails);

export default router;