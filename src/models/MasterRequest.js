
import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js';

const MasterRequest = sequelizeDB.define('MasterRequest', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  problem: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('new', 'assigned', 'completed'),
    defaultValue: 'new'
  },
  visitDate: {
    type: Sequelize.DATE
  }
});

MasterRequest.belongsTo(User, { as: 'Client' });
MasterRequest.belongsTo(User, { as: 'Master' });

export default MasterRequest;