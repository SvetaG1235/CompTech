import sequelize from '../db.js';
import User from './UserModel.js';
import Product from './ProductsModel.js';
import Order from './OrdersModel.js';
import OrderItem from './OrderItem.js';
import RepairRequest from './RepairRequestModel.js';
import MasterRequest from './MasterRequest.js';
import Consultation from './Consultation.js';

User.hasMany(MasterRequest, { foreignKey: 'clientId' });
User.hasMany(MasterRequest, { foreignKey: 'masterId' });

MasterRequest.belongsTo(User, { foreignKey: 'clientId', as: 'RequestingClient' });
MasterRequest.belongsTo(User, { foreignKey: 'masterId', as: 'AssignedMaster' });

User.hasMany(Order);
User.hasMany(RepairRequest);
User.hasMany(Consultation);

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

Product.belongsToMany(Order, { through: OrderItem });

RepairRequest.belongsTo(User);

Consultation.belongsTo(User);

export {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  RepairRequest,
  MasterRequest,
  Consultation
};