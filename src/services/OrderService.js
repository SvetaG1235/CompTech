import { Order, OrderItem } from '../models/index.js';

class OrderService {
  static async createOrder(data) {
    const order = await db.Order.create({ // ❗️Используется имя модели "Order"
      userId: data.userId,
      name: data.name,
      phone: data.phone,
      address: data.address,
      total: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });

    const orderItems = data.items.map(item => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    await db.OrderItem.bulkCreate(orderItems);

    return order;
  }

  static async getOrderDetails(id) {
    const order = await db.Order.findByPk(id, {
      include: [{
        model: db.OrderItem,
        as: 'items',
        include: [{ model: db.ProductsModel, as: 'product' }]
      }],
      raw: true,
      nest: true
    });

    return order;
  }
}

export default OrderService;