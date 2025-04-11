import ProductService from '../services/ProductService.js';

class ProductController {
  async index(req, res) {
    try {
      const products = await ProductService.getAll();
      res.render('products', { 
        title: 'Товары',
        products,
        user: req.session.user
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить товары'
      });
    }
  }
}

export default new ProductController();