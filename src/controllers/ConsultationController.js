import Consultation from '../models/Consultation.js';  // Добавьте импорт модели

class ConsultationController {
  async showConsForm(req, res) {
    res.render('consultation', {
        title: 'Консультация',
        user: req.session.user,
        formData: {} 
    });
}

async create(req, res) {
  try {
      const { name, phone, question, preferredContact } = req.body;
      
      if (!preferredContact) {
          throw new Error('Пожалуйста, выберите способ связи');
      }

      await Consultation.create({
          userId: req.session.user?.id,
          name,
          phone,
          question,
          preferredContact,
          status: 'new'
      });

      res.redirect('/consultation?success=true');
  } catch (error) {
      console.error('Ошибка создания консультации:', error);
      res.render('consultation', {
          title: 'Консультация',
          error: error.message,
          formData: req.body, 
          user: req.session.user
      });
  }
}
  
}

export default new ConsultationController();