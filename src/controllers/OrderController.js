import OrderService from '../services/OrderService.js';

class OrderController {
  async create(req, res) {
    try {
      const order = await OrderService.createOrder(req.session.user.id, req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await OrderService.getUserOrders(req.session.user.id);
      res.render('orders', {
        title: 'Мои заказы',
        orders,
        user: req.session.user
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить заказы'
      });
    }
  }
}

export default new OrderController();