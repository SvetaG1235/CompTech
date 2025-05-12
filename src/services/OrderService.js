import Order from '../models/OrdersModel.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/ProductsModel.js';
import sequelizeDB from '../db.js';

class OrderService {
  static async createOrder(orderData) {
    const t = await sequelizeDB.transaction();
    try {
      const { userId, name, phone, address, cartItems } = orderData;
      
      if (!cartItems?.length) throw new Error('Корзина пуста');
      if (!name || !phone || !address) throw new Error('Не заполнены обязательные поля');
  
      const products = await Product.findAll({
        where: { id: cartItems.map(item => item.productId) },
        transaction: t
      });
  
      const order = await Order.create({
        user_id: userId || null,
        name,
        phone,
        address,
        total: cartItems.reduce((sum, item) => {
          const product = products.find(p => p.id == item.productId);
          return sum + (product.price * item.quantity);
        }, 0),
        status: 'processing'
      }, { transaction: t });
  
      await OrderItem.bulkCreate(
        cartItems.map(item => ({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: products.find(p => p.id == item.productId).price
        })),
        { transaction: t }
      );
  
      await t.commit();
      return order;
    } catch (err) {
      await t.rollback();
      console.error('OrderService Error:', err);
      throw err;
    }
  }



  static async getOrderDetails(orderId) {
    return await Order.findByPk(orderId, {
      include: [
        {
          association: 'items',
          include: ['product']
        },
        {
          association: 'user',
          attributes: ['name', 'email', 'phone']
        }
      ]
    });
  }
}

export default new OrderService();