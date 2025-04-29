export default (req, res, next) => {
  if (req.session.user?.role === 'admin') {
    return next();
  }
  if (req.path.startsWith('/api')) {
    return res.status(403).json({ error: 'Доступ запрещен' });
  }
  
  res.status(403).redirect('/auth/login?error=Доступ запрещен');
};