import sequelize from '../db.js';
import User from './UserModel.js';
import Product from './ProductsModel.js';
import Consultation from './Consultation.js';
import MasterRequest from './MasterRequest.js';
import RepairRequest from './RepairRequestModel.js';
import Order from './OrdersModel.js';
import OrderItem from './OrderItem.js';

// Определяем функцию setupAssociations
function setupAssociations() {
  // User associations
  User.hasMany(Consultation, { foreignKey: 'userId', as: 'consultations' });
  Consultation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(MasterRequest, { foreignKey: 'clientId', as: 'clientRequests' });
  User.hasMany(MasterRequest, { foreignKey: 'masterId', as: 'assignedRequests' });
  MasterRequest.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
  MasterRequest.belongsTo(User, { foreignKey: 'masterId', as: 'master' });

  User.hasMany(RepairRequest, { foreignKey: 'userId', as: 'repairRequests' });
  RepairRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Product and Order associations
  Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products'
  });

  Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'productId',
    otherKey: 'orderId',
    as: 'orders'
  });
}

async function syncModels() {
  try {
    await setupAssociations();
    await sequelize.sync({ force: false, alter: false });
    console.log('All models synced successfully');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

export {
  sequelize,
  User,
  Product,
  Consultation,
  MasterRequest,
  RepairRequest,
  Order,
  OrderItem,
  syncModels
};