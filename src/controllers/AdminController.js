import AdminService from '../services/AdminService.js';
import Consultation from '../models/Consultation.js';
import User from '../models/UserModel.js';
import MasterRequest from '../models/MasterRequest.js';

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
        requests,
        user: req.session.user
      });
    } catch (error) {
      console.error('Master requests error:', error);
      res.status(500).render('error', { message: 'Ошибка загрузки заявок' });
    }
  }

  static async getRepairRequests(req, res) {
    try {
      const requests = await AdminService.getRepairRequests();
      res.render('admin/repairRequests', {
        title: 'Заявки на ремонт',
        requests,
        user: req.session.user
      });
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      res.status(500).render('error', { message: 'Ошибка загрузки заявок' });
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
        consultations,
        user: req.session.user
      });
    } catch (error) {
      console.error('Consultation error:', error);
      res.status(500).render('error', { message: 'Ошибка загрузки консультаций' });
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
}

export default AdminController;