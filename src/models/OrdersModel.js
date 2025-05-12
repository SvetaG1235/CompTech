import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const Order = sequelizeDB.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
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
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Order.associate = function(models) {
  Order.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  Order.hasMany(models.OrderItem, {
    foreignKey: 'order_id',
    as: 'items'
  });
};

export default Order;