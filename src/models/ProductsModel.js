import Sequelize from 'sequelize';
import sequelizeDB from '../db.js';

const Product = sequelizeDB.define('Product', {
  name: {
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
  imageUrl: Sequelize.STRING
});

export default Product;