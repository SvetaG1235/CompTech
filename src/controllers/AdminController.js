import AdminService from '../services/AdminService.js';

class AdminController {
  static async getProducts(req, res) {
    try {
      const products = await AdminService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateMasterRequest(req, res) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
      
      const updatedRequest = await AdminService.updateMasterRequest(id, {
        status,
        rejectionReason: reason
      });
      
      res.json(updatedRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateConsultation(req, res) {
    try {
      const { id } = req.params;
      const { status, comment } = req.body;
      
      const updatedConsultation = await AdminService.updateConsultation(id, {
        status,
        adminComment: comment
      });
      
      res.json(updatedConsultation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async showdashboard(req, res) {
    res.render('admin/dashboard', {
      title: 'Административная панель',
      user: req.session.user
    });
  }
  
}

export default AdminController;