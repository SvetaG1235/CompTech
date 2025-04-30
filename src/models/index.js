import sequelize from '../db.js';
import User from './UserModel.js';
import Product from './ProductsModel.js';
import Order from './OrdersModel.js';
import OrderItem from './OrderItem.js';
import RepairRequest from './RepairRequestModel.js';
import MasterRequest from './MasterRequest.js';
import Consultation from './Consultation.js';

function setupAssociations() {
  [User, Product, Order, RepairRequest, MasterRequest, Consultation].forEach(model => {
    if (model.associate) {
      model.associate({
        User,
        Product,
        Order,
        OrderItem,
        RepairRequest,
        MasterRequest,
        Consultation
      });
    }
  });
}

async function syncModels() {
  try {
    setupAssociations();
    await sequelize.sync({ alter: true });
    console.log('Все модели успешно синхронизированы.');
  } catch (error) {
    console.error('Ошибка синхронизации моделей:', error);
  }
}

export {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  RepairRequest,
  MasterRequest,
  Consultation,
  syncModels
};