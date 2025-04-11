import MasterService from '../services/MasterService.js';
import User from '../models/UserModel.js';

class MasterController {
  async showForm(req, res) {
    const masters = await User.findAll({
      where: { role: 'master' }
    });

    res.render('master', {
      title: 'Вызов мастера',
      masters,
      user: req.session.user
    });
  }

  async createRequest(req, res) {
    try {
      await MasterService.createRequest(req.session.user.id, req.body);
      res.redirect('/master?success=true');
    } catch (error) {
      res.render('master', {
        title: 'Вызов мастера',
        error: 'Ошибка при создании заявки',
        formData: req.body
      });
    }
  }
}

export default new MasterController();