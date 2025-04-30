import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js';

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
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  masterId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'master_requests',
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