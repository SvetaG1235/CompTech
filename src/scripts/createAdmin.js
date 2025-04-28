import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const createAdmin = async () => {
  try {
    const adminData = {
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      phone: '+79998887766',
      role: 'admin'
    };

    const existingAdmin = await User.findOne({ where: { email: adminData.email } });
    if (!existingAdmin) {
      await User.create(adminData);
      console.log('✅ Администратор успешно создан');
      console.log('Email: admin@example.com');
      console.log('Пароль: admin123');
    } else {
      console.log('ℹ️ Администратор уже существует');
    }
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    process.exit();
  }
};

createAdmin();