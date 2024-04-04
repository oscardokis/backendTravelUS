const express = require('express');
const cookieParser = require('cookie-parser');
const routerApi = require('./routes/index');
const cors = require('cors');
const {config} = require('./config/index');
const { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler} = require('./middlewares/error.handler');
const port = config.port;

const app = express();

const whiteList = ['http://localhost:3001', 'http://localhost:5173', 'http://127.0.0.1:5173', 'https://imaginative-sunshine-8206ba.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello TravelUS');
});


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