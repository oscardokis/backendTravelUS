const {  config } = require('../config');


// let URI = '';

// if (config.isProd) {
//   URI = config.dbUrl;
// } else {
//   const USER = encodeURIComponent(config.dbUser);
//   const PASSWORD = encodeURIComponent(config.dbPassword);
//   URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// }

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    url: config.dbUrl,
    dialect: 'postgres',
}}
