import Product from '../models/ProductsModel.js';

class ProductService {
  static async getAllProducts() {
    try {
      return await Product.findAll({
        order: [['category', 'ASC'], ['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Ошибка при получении товаров: ${error.message}`);
    }
  }
  static async addProduct(productData) {
    try {
      if (!productData.name || !productData.price || !productData.category) {
        throw new Error('Необходимо указать название, цену и категорию товара');
      }

      return await Product.create({
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock) || 0,
        description: productData.description || ''
      });
    } catch (error) {
      throw new Error(`Ошибка при добавлении товара: ${error.message}`);
    }
  }
  static async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Товар не найден');
      }
      await product.destroy();
      return true;
    } catch (error) {
      throw new Error(`Ошибка при удалении товара: ${error.message}`);
    }
  }
  static async updateProduct(id, productData) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Товар не найден');
      }

      return await product.update({
        name: productData.name || product.name,
        category: productData.category || product.category,
        price: productData.price ? parseFloat(productData.price) : product.price,
        stock: productData.stock ? parseInt(productData.stock) : product.stock,
        description: productData.description || product.description
      });
    } catch (error) {
      throw new Error(`Ошибка при обновлении товара: ${error.message}`);
    }
  }

  static async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Товар не найден');
      }
      return product;
    } catch (error) {
      throw new Error(`Ошибка при получении товара: ${error.message}`);
    }
  }

  static async getProductsByCategory(category) {
    try {
      return await Product.findAll({
        where: { category },
        order: [['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Ошибка при получении товаров по категории: ${error.message}`);
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
      throw new Error(`Ошибка при получении категорий: ${error.message}`);
    }
  }

  static async seedProducts() {
    const Products = [
      {
        name: 'ASUS ROG Strix G15',
        category: 'Ноутбуки',
        price: 1299.99,
        stock: 10,
        description: 'Игровой ноутбук с процессором Intel Core i7-11800H'
      },
      {
        name: 'Acer Nitro 5',
        category: 'Ноутбуки',
        price: 899.99,
        stock: 8,
        description: 'Игровой ноутбук с NVIDIA GeForce RTX 3050 Ti'
      },
      {
        name: 'Intel Core i9-12900K',
        category: 'Процессоры',
        price: 599.99,
        stock: 15,
        description: '16 ядер, 24 потока, тактовая частота до 5.2 ГГц'
      },
      {
        name: 'AMD Ryzen 9 5950X',
        category: 'Процессоры',
        price: 549.99,
        stock: 12,
        description: '16 ядер, 32 потока, тактовая частота до 4.9 ГГц'
      },
      {
        name: 'NVIDIA GeForce RTX 3080',
        category: 'Видеокарты',
        price: 899.99,
        stock: 5,
        description: '10GB GDDR6X, 8704 ядер CUDA'
      },
      {
        name: 'AMD Radeon RX 6800 XT',
        category: 'Видеокарты',
        price: 799.99,
        stock: 7,
        description: '16GB GDDR6, 4608 потоковых процессоров'
      },
      {
        name: 'Samsung 980 Pro 1TB',
        category: 'SSD',
        price: 199.99,
        stock: 20,
        description: 'NVMe SSD, скорость чтения до 7000 МБ/с'
      },
      {
        name: 'WD Black SN850 1TB',
        category: 'SSD',
        price: 189.99,
        stock: 18,
        description: 'NVMe SSD, скорость чтения до 7000 МБ/с'
      },
      {
        name: 'Kingston Fury 32GB',
        category: 'Оперативная память',
        price: 149.99,
        stock: 25,
        description: 'DDR4 3200MHz, 2x16GB'
      },
      {
        name: 'Corsair Vengeance 16GB',
        category: 'Оперативная память',
        price: 89.99,
        stock: 30,
        description: 'DDR4 3200MHz, 2x8GB'
      }
    ];
  
    await Product.destroy({ where: {} });
    return await Product.bulkCreate(products);
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
      throw new Error(`Ошибка при поиске товаров: ${error.message}`);
    }
  }
}

export default ProductService;