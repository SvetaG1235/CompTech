import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import { fileURLToPath } from 'url';
import db from './db.js';
import masterRouter from './routes/MasterRoutes.js';
import orderRouter from './routes/OrderRoutes.js';
import repairRoutes from './routes/RepairRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import productRouter from './routes/ProductRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


app.use('/', productRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);


db.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
});


app.use((req, res) => {
  res.status(404).render('404', { title: 'Страница не найдена' });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Ошибка сервера',
    message: err.message 
  });
});

export default app;