import AdminService from '../services/AdminService.js';
import Consultation from '../models/Consultation.js';
import User from '../models/UserModel.js';
import MasterRequest from '../models/MasterRequest.js';
import RepairRequest from '../models/RepairRequestModel.js';

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
      const requests = await MasterRequest.findAll({
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
        order: [['createdAt', 'DESC']]
      });
      
      res.render('admin/masterRequests', { 
        title: 'Заявки мастера',
        requests, 
        user: req.session.user,
        active: 'master-requests'
      });
    } catch (error) {
      console.error('Master requests error:', error);
      res.status(500).render('error', { 
        title: 'Ошибка',
        message: 'Не удалось загрузить заявки' 
      });
    }
  }

  static async getRepairRequests(req, res) {
    try {
      const requests = await RepairRequest.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
          required: false
        }],
        order: [['createdAt', 'DESC']]
      });
      
      res.render('admin/repairRequests', { 
        title: 'Repair Requests',
        requests,
        user: req.session.user
      });
    } catch (error) {
      console.error('Error loading repair requests:', error);
      res.status(500).render('error', { 
        title: 'Ошибка',
        message: 'Не удалось загрузить заявки на ремонт' 
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

  static async getConsultations(req, res) {
    try {
      const consultations = await Consultation.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
          required: false
        }],
        order: [['createdAt', 'DESC']]
      });
      
      res.render('admin/Consultations', { 
        title: 'Консультации',
        consultations, 
        user: req.session.user,
        active: 'consultations'
      });
    } catch (error) {
      console.error('Consultation error:', error);
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

  static async getMasterRequestsAPI(req, res) {
    try {
      const requests = await MasterRequest.findAll({
        include: [
          { model: User, as: 'client', attributes: ['id', 'name', 'phone'] },
          { model: User, as: 'master', attributes: ['id', 'name', 'phone'], required: false }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getConsultationsAPI(req, res) {
    try {
      const consultations = await Consultation.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
          required: false
        }],
        order: [['createdAt', 'DESC']]
      });
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getProductsAPI(req, res) {
    try {
      const products = await Product.findAll({
        order: [['createdAt', 'DESC']]
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


}

export default AdminController;