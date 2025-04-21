import Order from '../models/OrderModel.js';
import Product from '../models/ProductsModel.js';
import CartService from './CartService.js';

class OrderService {
  static async createOrder(userId, cartItems, orderData) {
    const products = await Product.findAll({
      where: { id: cartItems.map(item => item.productId) }
    });

    const order = await Order.create({
      userId,
      total: cartItems.reduce((sum, item) => {
        const product = products.find(p => p.id == item.productId);
        return sum + (product.price * item.quantity);
      }, 0),
      address: orderData.address,
      phone: orderData.phone
    });

    await order.addProducts(products.map(product => {
      const item = cartItems.find(i => i.productId == product.id);
      return {
        id: product.id,
        through: {
          quantity: item.quantity,
          price: product.price
        }
      };
    }));

    return order;
  }

  static async getUserOrders(userId) {
    return Order.findAll({
      where: { userId },
      include: [Product]
    });
  }
}

export default new OrderService();