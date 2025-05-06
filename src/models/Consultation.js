import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

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
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('new', 'processed', 'completed'),
    defaultValue: 'new'
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'Consultations',
  timestamps: true
});

Consultation.associate = function(models) {
  Consultation.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default Consultation;