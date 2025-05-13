import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const User = sequelizeDB.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
}, {
  timestamps: true
});

User.associate = function(models) {
  User.hasMany(models.Order, {
    foreignKey: 'userId',
    as: 'orders'
  });

  User.hasMany(models.RepairRequest, {
    foreignKey: 'userId',
    as: 'repairRequests'
  });

  User.hasMany(models.Consultation, {
    foreignKey: 'userId',
    as: 'consultations'
  });
};

export default User;