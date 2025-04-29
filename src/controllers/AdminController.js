import AdminService from '../services/AdminService.js';

class AdminController {
  static async getProducts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { products, total } = await AdminService.getPaginatedProducts(page, limit);
      
      res.render('admin/products', {
        title: 'Управление товарами',
        products,
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
        user: req.session.user,
        active: 'admin-products'
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить товары'
      });
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await AdminService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await AdminService.updateProduct(id, req.body);
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await AdminService.deleteProduct(id);
      res.json({
        success: true
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getMasterRequests(req, res) {
    try {
      const { status } = req.query;
      const requests = await AdminService.getMasterRequests(status);
      const masters = await AdminService.getAvailableMasters();
      
      res.render('admin/masterRequests', {
        title: 'Заявки мастера',
        requests,
        masters,
        user: req.session.user,
        active: 'admin-master',
        statusFilter: status || 'all'
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить заявки'
      });
    }
  }

  static async bulkUpdateMasterRequests(req, res) {
    try {
      const { ids, masterId, visitDate } = req.body;
      const result = await AdminService.bulkUpdateMasterRequests(ids, {
        masterId,
        visitDate,
        status: 'assigned'
      });
      
      res.json({
        success: true,
        updatedCount: result.length
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getProductsApi(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { products, total } = await AdminService.getPaginatedProducts(page, limit);
      res.json({ products, total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getMasterRequestsApi(req, res) {
    try {
      const requests = await AdminService.getMasterRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getConsultationsApi(req, res) {
    try {
      const consultations = await AdminService.getConsultations();
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getConsultations(req, res) {
    try {
      console.log('Session user:', req.session.user); 
      const { status } = req.query;
      const consultations = await AdminService.getConsultations(status);
      console.log('Consultations data:', consultations);
      
      res.render('admin/Consultations', {
        title: 'Консультации',
        consultations,
        user: req.session.user,
        active: 'admin-consultations',
        statusFilter: status || 'all'
      });
    } catch (error) {
      console.error('Full error:', error);
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить консультации'
      });
    }
  }

  static async showDashboard(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      
      res.render('admin/dashboard', {
        title: 'Административная панель',
        user: req.session.user,
        active: 'dashboard',
        stats
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Не удалось загрузить данные'
      });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AdminController;