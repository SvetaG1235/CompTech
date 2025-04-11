import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';
import Product from './Product.js';

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderItems' });

export default Order;