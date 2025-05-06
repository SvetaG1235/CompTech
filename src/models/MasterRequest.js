import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const MasterRequest = sequelizeDB.define('MasterRequest', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  },
  clientId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  masterId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'MasterRequests',
  timestamps: true
});

MasterRequest.associate = function(models) {
  MasterRequest.belongsTo(models.User, {
    foreignKey: 'clientId',
    as: 'client'
  });
  
  MasterRequest.belongsTo(models.User, {
    foreignKey: 'masterId',
    as: 'master'
  });
};

export default MasterRequest;