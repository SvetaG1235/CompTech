import RepairService from '../services/RepairService.js';

class RepairController {
  async showForm(req, res) {
    res.render('repair', {
      title: 'Заявка на ремонт',
      user: req.session.user
    });
  }

  async createRequest(req, res) {
    try {
      await RepairService.createRequest(req.session.user.id, req.body);
      res.redirect('/repair?success=true');
    } catch (error) {
      res.render('repair', {
        title: 'Заявка на ремонт',
        error: 'Ошибка при создании заявки',
        formData: req.body
      });
    }
  }
}

export default new RepairController();