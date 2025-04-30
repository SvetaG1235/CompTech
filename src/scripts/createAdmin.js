import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const createAdminAndMasters = async () => {
  try {
    // Создаем администратора
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

    // Создаем мастеров
    const mastersData = [
      {
        name: 'Мастер Иван',
        email: 'master1@example.com',
        password: await bcrypt.hash('master111', 10),
        phone: '+79111111111',
        role: 'master',
        specialization: 'Ремонт компьютеров'
      },
      {
        name: 'Мастер Петр',
        email: 'master2@example.com',
        password: await bcrypt.hash('master222', 10),
        phone: '+79222222222',
        role: 'master',
        specialization: 'Ремонт ноутбуков'
      },
      {
        name: 'Мастер Сергей',
        email: 'master3@example.com',
        password: await bcrypt.hash('master333', 10),
        phone: '+79333333333',
        role: 'master',
        specialization: 'Ремонт телефонов'
      }
    ];

    let createdMastersCount = 0;
    
    for (const masterData of mastersData) {
      const existingMaster = await User.findOne({ where: { email: masterData.email } });
      if (!existingMaster) {
        await User.create(masterData);
        createdMastersCount++;
        console.log(`✅ Мастер ${masterData.name} создан`);
      } else {
        console.log(`ℹ️ Мастер ${masterData.name} уже существует`);
      }
    }

    console.log(`\nИтого создано мастеров: ${createdMastersCount} из ${mastersData.length}`);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    process.exit();
  }
};

createAdminAndMasters();