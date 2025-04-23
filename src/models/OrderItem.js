import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import Order from './OrdersModel.js';
import Product from './ProductsModel.js';

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

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

export default OrderItem;