import ProductService from '../services/ProductService.js';
import Product from '../models/ProductsModel.js';

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const product = await ProductService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProductsGrouped(req, res) {
    try {
      const products = await Product.findAll({
        order: [['category', 'ASC'], ['name', 'ASC']]
      });
      
      const grouped = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {});
      
      res.render('products', {
        title: 'Наши товары',
        menuData: Object.entries(grouped),
        user: req.session.user
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: error.message
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async seed(req, res) {
    try {
      const seededProducts = await ProductService.seedProducts();
      res.status(201).json(seededProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async showProductsPage(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      const grouped = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {});
      
      res.render('products', {
        title: 'Наши товары',
        menuData: Object.entries(grouped),
        user: req.session.user
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: error.message
      });
    }
  }

  static async getByCategory(req, res) {
    try {
      const products = await ProductService.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductController;