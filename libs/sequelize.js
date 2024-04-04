const { Sequelize } = require('sequelize');
const { config } = require('../config');
const { setupModels } = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  loggin: config.isProd ? false : true,
};

if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl || URI, options);

setupModels(sequelize);

module.exports = sequelize;
