import { Sequelize } from 'sequelize';
import sequelizeDB from '../db.js';

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
  },
  clientId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  masterId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

export default MasterRequest;