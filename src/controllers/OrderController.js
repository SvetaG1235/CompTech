// src/controllers/OrderController.js

import db from '../models/index.js';
const { Order, OrderItem } = db;

class OrderController {
  async showNewOrderForm(req, res) {
    try {
      if (!req.session.cart?.items?.length) {
        return res.redirect('/cart');
      }

      res.render('order', {
        title: 'Оформление заказа',
        cart: req.session.cart
      });
    } catch (error) {
      console.error('Ошибка при открытии формы заказа:', error);
      res.status(500).render('error');
    }
  }

  async createOrder(req, res) {
    try {
      const { name, phone, address } = req.body;

      if (!name || !phone || !address) {
        return res.status(400).render('order', {
          title: 'Ошибка',
          error: 'Все поля обязательны',
          cart: req.session.cart
        });
      }

      const order = await Order.create({
        userId: req.session.user?.id,
        name,
        phone,
        address,
        total: req.session.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      });

      const items = req.session.cart.items.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      await OrderItem.bulkCreate(items);

      req.session.cart = { items: [] };

      res.redirect(`/orders/${order.id}`);
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось создать заказ'
      });
    }
  }

  async getOrderDetails(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);

      if (!order) {
        return res.status(404).render('404', {
          title: 'Заказ не найден'
        });
      }

      res.render('order-details', {
        title: `Заказ #${order.id}`,
        order
      });
    } catch (error) {
      console.error('Ошибка получения данных о заказе:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось получить данные о заказе'
      });
    }
  }
}

export default new OrderController();