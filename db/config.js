const {  config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    loggin: false
  },
  production: {
    url: URI,
    dialect: 'postgres',
    loggin: false
  },
  test: {
    url: URI,
    dialect: 'postgres',
}}
