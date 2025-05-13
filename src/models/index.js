// src/models/index.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelizeDB from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const modelFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

for (const file of modelFiles) {
  const filePath = path.join(__dirname, file);
  const fileURL = new URL(`file://${filePath}`);

  const model = await import(fileURL);
  const modelFunction = model.default;

  const modelDef = new modelFunction(sequelizeDB, Sequelize.DataTypes);
  db[modelDef.name] = modelDef;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ❗ Экспорт по умолчанию — это объект db
export default db;