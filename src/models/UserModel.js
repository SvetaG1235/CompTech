import Sequelize from 'sequelize';
import sequelizeDB from '../db.js';

const User = sequelizeDB.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('user', 'admin', 'master'),
    defaultValue: 'user'
  }
});

export default User;