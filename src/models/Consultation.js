import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';
import User from './UserModel.js'; 

const Consultation = sequelizeDB.define('Consultation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  preferredContact: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['email', 'phone', 'any']]
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'processed', 'rejected']] 
    }
  },
  adminComment: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  userId: { 
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
  timestamps: true, 
  tableName: 'consultations', 
  underscored: true 
});

Consultation.associate = function(models) {
  Consultation.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'SET NULL'
  });
};

export default Consultation;