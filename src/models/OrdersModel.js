// src/models/OrdersModel.js

import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const Order = sequelizeDB.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'processing'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

Order.associate = function(models) {
  Order.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Order.hasMany(models.OrderItem, {
    foreignKey: 'orderId',
    as: 'items'
  });
};

export default Order;