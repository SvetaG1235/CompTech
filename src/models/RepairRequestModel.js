import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './User.js';

const RepairRequest = sequelizeDB.define('RepairRequest', {
  device: {
    type: Sequelize.STRING,
    allowNull: false
  },
  problem: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('new', 'in_progress', 'completed'),
    defaultValue: 'new'
  }
});

RepairRequest.belongsTo(User);

export default RepairRequest;