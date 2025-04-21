import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const OrderItem = sequelizeDB.define('OrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});

export default OrderItem;