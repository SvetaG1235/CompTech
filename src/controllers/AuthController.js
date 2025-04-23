import AuthService from '../services/AuthService.js';

class AuthController {
  async showLogin(req, res) {
    res.render('login', { 
      title: 'Вход',
      error: req.query.error 
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).render('login', { error: 'Неверные данные' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).render('login', { error: 'Неверные данные' });

      req.session.user = user;
      
      if (user.role === 'admin') {
        return res.redirect('/admin');
      }
      res.redirect('/profile');
    } catch (error) {
      res.status(500).render('login', { error: 'Ошибка сервера' });
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }

  async showRegister(req, res) {
    res.render('register', { 
      title: 'Регистрация',
      error: req.query.error 
    });
  }
  
  async register(req, res) {
    try {
      await AuthService.register(req.body);
      res.redirect('/auth/login');
    } catch (error) {
      res.render('register', {
        title: 'Регистрация',
        error: 'Ошибка регистрации',
        formData: req.body
      });
    }
  }
  static async resetPassword(req, res) {
    res.render('forgotpass')
  }
  
}

export default new AuthController();