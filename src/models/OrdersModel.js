import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js';
import Product from './ProductsModel.js';

const Order = sequelizeDB.define('Order', {
  status: {
    type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  total: {
    type:Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});

Order.belongsToMany(Product, { 
  through: 'OrderItems',
  foreignKey: 'orderId',
  otherKey: 'productId'
});
Product.belongsToMany(Order, {
  through: 'OrderItems',
  foreignKey: 'productId',
  otherKey: 'orderId'
});

export default Order;