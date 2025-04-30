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
      notEmpty: true
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: Sequelize.ENUM('new', 'processed', 'completed'),
    defaultValue: 'new'
  },
  adminComment: {
    type: Sequelize.TEXT
  },
  questionerName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'consultations',
  timestamps: true
});

Consultation.associate = function(models) {
  Consultation.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default Consultation;