import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

class AuthController {
  // Показ формы входа
  showLogin(req, res) {
    res.render('login', { 
      title: 'Вход в систему',
      error: req.query.error 
    });
  }

  // Обработка входа
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.render('login', {
          title: 'Вход в систему',
          error: 'Пользователь не найден'
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.render('login', {
          title: 'Вход в систему',
          error: 'Неверный пароль'
        });
      }

      req.session.user = user;
      
      if (user.role === 'admin') {
        return res.redirect('/admin');
      }
      res.redirect('/');
    } catch (error) {
      console.error('Login error:', error);
      res.render('login', {
        title: 'Вход в систему',
        error: 'Произошла ошибка при входе'
      });
    }
  }

  // Выход
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

  // Показ формы регистрации
  showRegister(req, res) {
    res.render('register', {
      title: 'Регистрация',
      error: req.query.error
    });
  }

  // Обработка регистрации
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      
      // Проверка на существующего пользователя
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.render('register', {
          title: 'Регистрация',
          error: 'Пользователь с таким email уже существует'
        });
      }

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Создание пользователя
      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'user' // По умолчанию обычный пользователь
      });
      
      // Перенаправление после успешной регистрации
      res.redirect('/auth/login?success=Регистрация прошла успешно');
    } catch (error) {
      console.error('Registration error:', error);
      res.render('register', {
        title: 'Регистрация',
        error: 'Произошла ошибка при регистрации'
      });
    }
  }
}

export default new AuthController();