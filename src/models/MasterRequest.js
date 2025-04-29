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
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'master_requests',
  timestamps: true,
  underscored: true
});

MasterRequest.associate = function(models) {
  MasterRequest.belongsTo(models.User, {
    as: 'RequestingClient',
    foreignKey: 'clientId'
  });
  MasterRequest.belongsTo(models.User, {
    as: 'AssignedMaster',
    foreignKey: 'masterId'
  });
};

export default MasterRequest;