import User from '../models/UserModel.js';
import Product from '../models/ProductsModel.js';
import bcrypt from 'bcrypt';

const createAdminAndMasters = async () => {
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

    const testProducts = [
      {
        name: 'ASUS ROG Strix G15',
        category: 'Ноутбуки',
        price: 1299.99,
        stock: 10,
        description: 'Игровой ноутбук с процессором Intel Core i7-11800H'
      },
      {
        name: 'Acer Nitro 5',
        category: 'Ноутбуки',
        price: 899.99,
        stock: 8,
        description: 'Игровой ноутбук с NVIDIA GeForce RTX 3050 Ti'
      },
      {
        name: 'Lenovo IdeaPad 5',
        category: 'Ноутбуки',
        price: 799.99,
        stock: 12,
        description: 'Ультрабук с экраном 14" и процессором AMD Ryzen 7'
      },
      {
        name: 'Intel Core i9-12900K',
        category: 'Процессоры',
        price: 599.99,
        stock: 15,
        description: '16 ядер, 24 потока, тактовая частота до 5.2 ГГц'
      },
      {
        name: 'AMD Ryzen 9 5950X',
        category: 'Процессоры',
        price: 549.99,
        stock: 12,
        description: '16 ядер, 32 потока, тактовая частота до 4.9 ГГц'
      },
      {
        name: 'Intel Core i5-12400F',
        category: 'Процессоры',
        price: 199.99,
        stock: 20,
        description: '6 ядер, 12 потоков, тактовая частота до 4.4 ГГц'
      },
      {
        name: 'NVIDIA GeForce RTX 3080',
        category: 'Видеокарты',
        price: 899.99,
        stock: 5,
        description: '10GB GDDR6X, 8704 CUDA ядер'
      },
      {
        name: 'AMD Radeon RX 6800 XT',
        category: 'Видеокарты',
        price: 799.99,
        stock: 7,
        description: '16GB GDDR6, 4608 потоковых процессоров'
      },
      {
        name: 'Samsung 980 Pro 1TB',
        category: 'SSD',
        price: 149.99,
        stock: 25,
        description: 'NVMe M.2, скорость чтения до 7000 МБ/с'
      },
      {
        name: 'WD Blue SN570 1TB',
        category: 'SSD',
        price: 99.99,
        stock: 18,
        description: 'NVMe M.2, скорость чтения до 3500 МБ/с'
      },
      {
        name: 'Kingston Fury Beast 32GB',
        category: 'Оперативная память',
        price: 129.99,
        stock: 30,
        description: 'DDR4 3200MHz, комплект 2x16GB'
      },
      {
        name: 'Corsair Vengeance LPX 16GB',
        category: 'Оперативная память',
        price: 69.99,
        stock: 40,
        description: 'DDR4 3000MHz, комплект 2x8GB'
      },
      {
        name: 'Logitech G Pro X',
        category: 'Клавиатуры',
        price: 129.99,
        stock: 15,
        description: 'Механическая игровая клавиатура'
      },
      {
        name: 'Razer DeathAdder V2',
        category: 'Мыши',
        price: 59.99,
        stock: 22,
        description: 'Игровая мышь с оптическим сенсором'
      },
      {
        name: 'Apple iPhone 13 Pro',
        category: 'Смартфоны',
        price: 999.99,
        stock: 8,
        description: '6.1", A15 Bionic, 128GB'
      },
      {
        name: 'Samsung Galaxy S22 Ultra',
        category: 'Смартфоны',
        price: 1199.99,
        stock: 6,
        description: '6.8", Exynos 2200, 256GB'
      }
    ];

    let createdProductsCount = 0;
    const existingProducts = await Product.findAll();

    if (existingProducts.length === 0) {
      for (const productData of testProducts) {
        await Product.create(productData);
        createdProductsCount++;
        console.log(`✅ Товар "${productData.name}" создан`);
      }
      console.log(`\nИтого создано товаров: ${createdProductsCount}`);
    } else {
      console.log('\nℹ️ В базе уже есть товары, пропускаем создание');
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    process.exit();
  }
};

createAdminAndMasters();