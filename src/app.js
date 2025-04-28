import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import { create } from 'express-handlebars';
import db from './db.js';

import ProductService from './services/ProductService.js';
import authRouter from './routes/AuthRoutes.js';
import consultationRouter from './routes/ConsultationRoutes.js';
import masterRouter from './routes/MasterRoutes.js';
import orderRouter from './routes/OrderRoutes.js';
import repairRouter from './routes/RepairRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import homeRouter from './routes/HomeRoutes.js';
import adminRouter from './routes/AdminRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a === b,
    neq: (a, b) => a !== b,
    lt: (a, b) => a < b,
    gt: (a, b) => a > b,
    lte: (a, b) => a <= b,
    gte: (a, b) => a >= b,
    multiply: (a, b) => a * b,
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

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  
  res.locals.user = req.session.user;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.active = req.path.split('/')[1] || 'home';
  next();
});

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/master', masterRouter);
app.use('/orders', orderRouter);
app.use('/consultation', consultationRouter)
app.use('/repair', repairRouter);
app.use('/products', productRouter);

app.get('/products', (req, res) => {
  res.redirect('/products/grouped');
});

app.post('/cart/add', (req, res) => {
  const { id, name, price, quantity } = req.body;
  const existingItem = req.session.cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ id, name, price, quantity });
  }
  
  res.json({ success: true });
});

db.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));

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