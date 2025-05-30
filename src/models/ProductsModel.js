import Sequelize from 'sequelize';
import sequelizeDB from '../db.js';
import Order from './OrdersModel.js';
const Product = sequelizeDB.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    description: Sequelize.TEXT,
    imageUrl: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true
});

Product.associate = function(models) {
    Product.belongsToMany(models.Order, {
      through: models.OrderItem,
      foreignKey: 'productId',
      otherKey: 'orderId',
      as: 'orders'
    });
  };
  
export default Product;