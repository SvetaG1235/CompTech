import Product from '../models/ProductsModel.js';
import { Sequelize } from 'sequelize';

class ProductService {
  static async getAllProducts() {
    try {
      return await Product.findAll({
        order: [['category', 'ASC'], ['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to get products: ${error.message}`);
    }
  }

  static async addProduct(productData) {
    try {
      if (!productData.name || !productData.price || !productData.category) {
        throw new Error('Name, price and category are required');
      }

      return await Product.create({
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock) || 0,
        description: productData.description || '',
        imageUrl: productData.imageUrl || null
      });
    } catch (error) {
      throw new Error(`Failed to add product: ${error.message}`);
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      await product.destroy();
      return true;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  static async updateProduct(id, productData) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }

      return await product.update({
        name: productData.name || product.name,
        category: productData.category || product.category,
        price: productData.price ? parseFloat(productData.price) : product.price,
        stock: productData.stock ? parseInt(productData.stock) : product.stock,
        description: productData.description || product.description,
        imageUrl: productData.imageUrl || product.imageUrl
      });
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  static async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Failed to get product: ${error.message}`);
    }
  }

  static async getProductsByCategory(category) {
    try {
      return await Product.findAll({
        where: { category },
        order: [['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to get products by category: ${error.message}`);
    }
  }

  static async getCategories() {
    try {
      const categories = await Product.findAll({
        attributes: ['category'],
        group: ['category'],
        order: [['category', 'ASC']]
      });
      return categories.map(item => item.category);
    } catch (error) {
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }

  static async seedProducts() {
    const testProducts = [
      {
        name: 'ASUS ROG Strix G15',
        category: 'Laptops',
        price: 1299.99,
        stock: 10,
        description: 'Gaming laptop with Intel Core i7-11800H'
      },
      {
        name: 'Acer Nitro 5',
        category: 'Laptops',
        price: 899.99,
        stock: 8,
        description: 'Gaming laptop with NVIDIA GeForce RTX 3050 Ti'
      },
      {
        name: 'Intel Core i9-12900K',
        category: 'Processors',
        price: 599.99,
        stock: 15,
        description: '16 cores, 24 threads, up to 5.2 GHz'
      },
      {
        name: 'AMD Ryzen 9 5950X',
        category: 'Processors',
        price: 549.99,
        stock: 12,
        description: '16 cores, 32 threads, up to 4.9 GHz'
      },
      {
        name: 'NVIDIA GeForce RTX 3080',
        category: 'Graphics Cards',
        price: 899.99,
        stock: 5,
        description: '10GB GDDR6X, 8704 CUDA cores'
      },
      {
        name: 'AMD Radeon RX 6800 XT',
        category: 'Graphics Cards',
        price: 799.99,
        stock: 7,
        description: '16GB GDDR6, 4608 stream processors'
      },
      {
        name: 'Samsung 980 Pro 1TB',
        category: 'SSD',
        price: 199.99,
        stock: 20,
        description: 'NVMe SSD, read speed up to 7000 MB/s'
      },
      {
        name: 'WD Black SN850 1TB',
        category: 'SSD',
        price: 189.99,
        stock: 18,
        description: 'NVMe SSD, read speed up to 7000 MB/s'
      },
      {
        name: 'Kingston Fury 32GB',
        category: 'RAM',
        price: 149.99,
        stock: 25,
        description: 'DDR4 3200MHz, 2x16GB'
      },
      {
        name: 'Corsair Vengeance 16GB',
        category: 'RAM',
        price: 89.99,
        stock: 30,
        description: 'DDR4 3200MHz, 2x8GB'
      }
    ];

    try {
      await Product.destroy({ where: {} });
      const createdProducts = await Product.bulkCreate(testProducts);
      return createdProducts;
    } catch (error) {
      throw new Error(`Failed to seed products: ${error.message}`);
    }
  }

  static async searchProducts(query) {
    try {
      return await Product.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${query}%`
          }
        },
        order: [['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  }
}

export default ProductService;