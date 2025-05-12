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
}, {
  tableName: 'order_items',
  timestamps: false,
  underscored: true
});

OrderItem.associate = function(models) {
  OrderItem.belongsTo(models.Order, {
    foreignKey: 'order_id'
  });
  OrderItem.belongsTo(models.Product, {
    foreignKey: 'product_id'
  });
};

export default OrderItem;