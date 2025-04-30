import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js';

const RepairRequest = sequelizeDB.define('RepairRequest', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  },
  user_id: {  
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'repair_requests', 
  underscored: true, 
  timestamps: true,   
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

RepairRequest.associate = function(models) {
  RepairRequest.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default RepairRequest;