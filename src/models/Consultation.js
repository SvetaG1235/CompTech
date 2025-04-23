import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

const Consultation = sequelizeDB.define('Consultation', {
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  preferredContact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  },
  adminComment: {
    type: Sequelize.TEXT
  }
});

export default Consultation;