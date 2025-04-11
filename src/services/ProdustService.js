import Product from '../models/Product.js';

class ProductService {
  async getAll() {
    return Product.findAll();
  }

  async getById(id) {
    return Product.findByPk(id);
  }

  async create(productData) {
    return Product.create(productData);
  }
}

export default new ProductService();