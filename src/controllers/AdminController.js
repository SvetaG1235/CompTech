import Order from '../models/OrdersModel.js';
import RepairRequest from '../models/RepairRequestModel.js';
import MasterRequest from '../models/MasterRequest.js';

class AdminController {
  async dashboard(req, res) {
    const [orders, repairs, masterRequests] = await Promise.all([
      Order.findAll(),
      RepairRequest.findAll(),
      MasterRequest.findAll()
    ]);
    
    res.render('admin', {
      title: 'Админ панель',
      orders,
      repairs,
      masterRequests
    });
  }
}

export default new AdminController();