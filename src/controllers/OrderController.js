import OrderService from '../services/OrderService.js';

class OrderController {
  async create(req, res) {
    // Инициализация корзины
    if (!req.session.cart) {
      req.session.cart = [];
    }

    try {
      // Форматируем данные перед передачей в шаблон
      const order = await OrderService.createOrder(req.session.user.id, req.body);
      const formattedOrder = {
        ...order.toJSON(),
        formattedDate: order.createdAt.toISOString().split('T')[0]
      };
      
      res.status(201).json(formattedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = (await OrderService.getUserOrders(req.session.user.id)).map(order => ({
        ...order.get({ plain: true }),
        formattedDate: order.createdAt.toLocaleDateString(),
        products: order.Products.map(product => ({
          ...product.get({ plain: true }),
          total: product.price * product.OrderItem.quantity
        }))
      }));
      
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