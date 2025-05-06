import ProductService from '../services/ProductService.js';

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      console.error('Get all products error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Ошибка при получении товаров',
        details: error.message 
      });
    }
  }

  static async addProduct(req, res) {
    try {
      const product = await ProductService.addProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Товар успешно добавлен',
        data: product
      });
    } catch (error) {
      console.error('Add product error:', error);
      res.status(400).json({ 
        success: false,
        error: 'Ошибка при добавлении товара',
        details: error.message 
      });
    }
  }

  static async getProductsGrouped(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      const grouped = products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
      }, {});
      
      res.render('products', {
        title: 'Наши товары',
        menuData: Object.entries(grouped),
        user: req.session.user,
        success: true
      });
    } catch (error) {
      console.error('Get grouped products error:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить список товаров',
        errorDetails: error.message
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(error.message.includes('не найден') ? 404 : 500).json({ 
        success: false,
        error: 'Ошибка при удалении товара',
        details: error.message 
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Товар успешно обновлен',
        data: product
      });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(error.message.includes('не найден') ? 404 : 400).json({ 
        success: false,
        error: 'Ошибка при обновлении товара',
        details: error.message 
      });
    }
  }

  static async seed(req, res) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ 
          success: false,
          error: 'Метод не разрешен. Используйте POST.' 
        });
      }

      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          success: false,
          error: 'Заполнение тестовыми данными запрещено в production'
        });
      }

      const seededProducts = await ProductService.seedProducts();
      res.status(201).json({
        success: true,
        message: 'База данных успешно заполнена тестовыми данными',
        count: seededProducts.length,
        data: seededProducts
      });
    } catch (error) {
      console.error('Seed products error:', error);
      res.status(500).json({
        success: false,
        error: 'Ошибка при заполнении базы данных',
        details: error.message
      });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Get product error:', error);
      res.status(404).json({ 
        success: false,
        error: 'Товар не найден',
        details: error.message 
      });
    }
  }

  static async showProductsPage(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      const grouped = products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
      }, {});
      
      res.render('products', {
        title: 'Наши товары',
        menuData: Object.entries(grouped),
        user: req.session.user,
        success: true
      });
    } catch (error) {
      console.error('Show products page error:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить страницу товаров',
        errorDetails: error.message
      });
    }
  }

  static async getByCategory(req, res) {
    try {
      const products = await ProductService.getProductsByCategory(req.params.category);
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      console.error('Get by category error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Ошибка при получении товаров по категории',
        details: error.message 
      });
    }
  }
}

export default ProductController;