// src/controllers/AuthController.js

import db from '../models/index.js';
import bcrypt from 'bcrypt';

const { User } = db;

class AuthController {
  showLogin(req, res) {
    res.render('login', { 
      title: 'Вход в систему',
      error: req.query.error 
    });
  }

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
        return res.redirect('/admin/dashboard');
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

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

  showRegister(req, res) {
    res.render('register', {
      title: 'Регистрация',
      error: req.query.error
    });
  }

  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.render('register', {
          title: 'Регистрация',
          error: 'Пользователь с таким email уже существует'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'user'
      });

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