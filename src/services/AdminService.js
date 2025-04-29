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
    
    return MasterRequest.findAll({
      where,
      include: [
        {
          model: User,
          as: 'RequestingClient',
          attributes: ['id', 'name', 'phone']
        },
        {
          model: User,
          as: 'AssignedMaster',
          attributes: ['id', 'name', 'phone'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
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
      attributes: ['id', 'name', 'specialization']
    });
  }

  static async getConsultations(status = 'all') {
    const where = {};
    if (status !== 'all') where.status = status;
    
    return Consultation.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'phone'],
        required: false 
      }],
      order: [['createdAt', 'DESC']] 
    });
  }

  static async getDashboardStats() {
    const [productsCount, consultationsCount, masterRequestsCount, recentProducts] = await Promise.all([
      Product.count(),
      Consultation.count(),
      MasterRequest.count(),
      Product.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5
      })
    ]);
    
    return {
      productsCount,
      consultationsCount,
      masterRequestsCount,
      recentProducts
    };
  }
}

export default AdminService;