import AuthService from '../services/AuthService.js';

class AuthController {
  async showLogin(req, res) {
    res.render('login', { 
      title: 'Вход',
      error: req.query.error 
    });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);

      if (!user) {
        return res.render('login', {
          title: 'Вход',
          error: 'Неверный email или пароль',
          email
        });
      }

      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };

      res.redirect('/');
    } catch (error) {
      res.render('login', {
        title: 'Вход',
        error: 'Ошибка сервера',
        email: req.body.email
      });
    }
  }

  async logout(req, res) {
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
  
}

export default new AuthController();