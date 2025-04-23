import {
    Product,
    Order,
    RepairRequest,
    MasterRequest,
    Consultation
  } from '../models/index.js';
  
  class AdminService {
    static async getAllProducts() {
      return await Product.findAll();
    }
  
    static async createProduct(productData) {
      return await Product.create(productData);
    }
  
    static async updateProduct(id, updateData) {
      await Product.update(updateData, { where: { id } });
      return await Product.findByPk(id);
    }
  
    static async deleteProduct(id) {
      return await Product.destroy({ where: { id } });
    }
  
    static async getAllOrders() {
      return await Order.findAll({
        include: ['User', 'Products']
      });
    }
  
    static async getRepairRequests() {
      return await RepairRequest.findAll({
        include: ['User']
      });
    }
    static async getMasterRequests() {
        return await MasterRequest.findAll({
          include: [
            {
              association: 'RequestingClient',
              attributes: ['id', 'name', 'phone']
            },
            {
              association: 'AssignedMaster',
              attributes: ['id', 'name', 'phone'],
              required: false
            }
          ]
        });
      }
      
      static async updateMasterRequest(id, data) {
        await MasterRequest.update(data, { where: { id } });
        return await MasterRequest.findByPk(id, {
          include: [
            {
              association: 'RequestingClient',
              attributes: ['id', 'name', 'phone']
            }
          ]
        });
      }

    static async getConsultations() {
      return await Consultation.findAll({
        include: ['User']
      });
    }
  
    static async updateConsultation(id, data) {
      await Consultation.update(data, { where: { id } });
      return await Consultation.findByPk(id);
    }
  }
  
  export default AdminService;