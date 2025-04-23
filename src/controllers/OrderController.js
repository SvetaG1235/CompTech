import OrderService from '../services/OrderService.js';
import CartService from '../services/CartService.js';

export class OrderController {
  async createOrder(req, res) {
    try {
      if (!req.session.cart?.length) {
        throw new Error('Корзина пуста');
      }

      const order = await OrderService.createOrder(
        req.session.user.id,
        req.session.cart,
        req.body
      );

      CartService.clearCart(req);
      
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await OrderService.getUserOrders(req.session.user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OrderController();