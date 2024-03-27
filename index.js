const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const {config} = require('./config/index');
const { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler} = require('./middlewares/error.handler');


const app = express();
const port = config.port;

app.use(express.json());

const whiteList = ['http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));

require('./utils/auth');

routerApi(app);
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//middleware log error sequelize boom error

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
  });

module.exports = app;