import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const Order = sequelizeDB.define('Order', {
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
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true 
});


Order.associate = function(models) {
  Order.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
  
  Order.belongsToMany(models.Product, {
    through: models.OrderItem,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products'
  });
};


export default Order;
