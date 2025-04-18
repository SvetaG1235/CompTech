import ProductService from '../services/ProductService.js';

class HomeController {
  async index(req, res) {
    try {
      // Получаем все товары и берем первые 4
      const allProducts = await ProductService.getAllProducts();
      const featuredProducts = allProducts.slice(0, 4);
      
      res.render('index', {
        title: 'Главная',
        featuredProducts,
        user: req.session.user
      });
    } catch (error) {
      console.error('Ошибка загрузки главной:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить главную страницу'
      });
    }
  }
}

export default new HomeController();
