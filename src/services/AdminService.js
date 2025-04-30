import {
  Product,
  MasterRequest,
  Consultation,
  User
} from '../models/index.js';

class AdminService {
  static async getPaginatedProducts(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    return {
      products: rows,
      total: count
    };
  }

  static async createProduct(productData) {
    return Product.create(productData);
  }

  static async updateProduct(id, updateData) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Товар не найден');
    
    return product.update(updateData);
  }

  static async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Товар не найден');
    
    return product.destroy();
  }

  static async getMasterRequests(status = 'all') {
    const where = {};
    if (status !== 'all') where.status = status;
    
    return await MasterRequest.findAll({
      where,
      include: [
        {
          model: User,
          as: 'client', 
          attributes: ['id', 'name', 'phone']
        },
        {
          model: User,
          as: 'master', 
          attributes: ['id', 'name', 'phone'],
          required: false
        }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  static async bulkUpdateMasterRequests(ids, updateData) {
    return MasterRequest.update(updateData, {
      where: { id: ids },
      returning: true
    });
  }

  static async getAvailableMasters() {
    return User.findAll({
      where: { role: 'master' },
      attributes: ['id', 'name']
    });
  }

  static async getRepairRequests() {
    return await RepairRequest.findAll({
      include: [{
        model: User,
        as: 'repairRequestUser',  // Должно совпадать с алиасом в index.js
        attributes: ['id', 'name', 'phone']
      }],
      order: [['created_at', 'DESC']]
    });
  }

  static async getConsultations(status = 'all') {
    const where = {};
    if (status !== 'all') where.status = status;
    
    return await Consultation.findAll({
      where,
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'name', 'email', 'phone'],
        required: false
      }],
      order: [['createdAt', 'DESC']]
    });
  }

  static async getDashboardStats() {
    const [productsCount, consultationsCount, masterRequestsCount] = await Promise.all([
      Product.count(),
      Consultation.count(),
      MasterRequest.count()
    ]);
  
    return {
      productsCount: productsCount || 0,
      consultationsCount: consultationsCount || 0,
      masterRequestsCount: masterRequestsCount || 0
    };
  }
}

export default AdminService;