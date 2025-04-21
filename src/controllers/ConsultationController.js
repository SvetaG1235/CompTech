import RepairService from '../services/RepairService.js';

class ConsultationController{
async showConsForm(req, res) {
    res.render('consultation', {
      title: 'Консультация',
      user: req.session.user
    });
  }
} 

  export default new ConsultationController();