'use strict';

const { readdirSync } = require('fs');
const { join, basename } = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const db = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
)

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename(__filename) &&
      file.endsWith(".js") &&
      !file.endsWith('.test.js')
    );
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
