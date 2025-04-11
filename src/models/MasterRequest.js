import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const MasterRequest = sequelize.define('MasterRequest', {
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'assigned', 'completed'),
    defaultValue: 'new'
  },
  visitDate: {
    type: DataTypes.DATE
  }
});

MasterRequest.belongsTo(User, { as: 'Client' });
MasterRequest.belongsTo(User, { as: 'Master' });

export default MasterRequest;