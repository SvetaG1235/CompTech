import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import { create } from 'express-handlebars';
import db from './db.js';
import { syncModels } from './models/index.js';

import ProductService from './services/ProductService.js';
import authRouter from './routes/AuthRoutes.js';
import consultationRouter from './routes/ConsultationRoutes.js';
import masterRouter from './routes/MasterRoutes.js';
import orderRouter from './routes/OrderRoutes.js';
import cartRouter from './routes/CartRoutes.js'; // Переименовано для ясности
import CartService from './services/CartService.js';
import repairRouter from './routes/RepairRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import homeRouter from './routes/HomeRoutes.js';
import adminRouter from './routes/AdminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Настройка Handlebars
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    eq: (a, b) => a === b,
    neq: (a, b) => a !== b,
    lt: (a, b) => a < b,
    gt: (a, b) => a > b,
    lte: (a, b) => a <= b,
    gte: (a, b) => a >= b,
    multiply: (a, b) => a * b,
    calculateTotal: function(cart) {
      if (!cart || !cart.items) return 0;
      return cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    formatPrice: (price) => {
      if (isNaN(price)) return '0.00';
      return parseFloat(price).toFixed(2);
    },
    and() {
      return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    formatDate: (date) => new Date(date).toLocaleDateString(),
    json: (context) => JSON.stringify(context)
  }
});

syncModels();

// 2. Middleware в правильном порядке
app.use(logger('dev'));
app.use(express.json()); // Должен быть перед session
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// 3. Инициализация корзины (единообразная структура)
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = { items: [] }; // Всегда используем объект с items
  }
  
  res.locals.user = req.session.user;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.active = req.path.split('/')[1] || 'home';
  next();
});

// 4. Настройка шаблонов и статических файлов
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// 5. Маршруты (без дублирования)
app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/master', masterRouter);
app.use('/orders', orderRouter);
app.use('/cart', cartRouter); // Все операции с корзиной через этот роутер
app.use('/consultation', consultationRouter);
app.use('/repair', repairRouter);
app.use('/products', productRouter);

// 6. Перенаправление
app.get('/products', (req, res) => {
  res.redirect('/products/grouped');
});

// 7. Обработка ошибок
app.use((req, res) => {
  res.status(404).render('404', { title: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Ошибка сервера',
    message: err.message 
  });
});

export default app;