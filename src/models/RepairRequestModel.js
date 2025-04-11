import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const RepairRequest = sequelize.define('RepairRequest', {
  device: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'completed'),
    defaultValue: 'new'
  }
});

RepairRequest.belongsTo(User);

export default RepairRequest;