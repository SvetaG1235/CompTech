import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js';

const Order = sequelizeDB.define('Order', {
  status: {
    type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
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
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});

Order.belongsTo(User);
User.hasMany(Order);

export default Order;