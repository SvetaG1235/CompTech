import Order from '../models/Order.js';
import Product from '../models/Product.js';

class OrderService {
  async createOrder(userId, orderData) {
    const { products, ...orderDetails } = orderData;
    
    const order = await Order.create({
      ...orderDetails,
      userId
    });

    if (products && products.length) {
      const productInstances = await Product.findAll({
        where: { id: products.map(p => p.id) }
      });
      
      await order.addProducts(productInstances);
    }

    return order;
  }

  async getUserOrders(userId) {
    return Order.findAll({
      where: { userId },
      include: [Product]
    });
  }
}

export default new OrderService();