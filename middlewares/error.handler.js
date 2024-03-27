const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  if (err) {
    res.status(500).json({ message: err.message, stack: err.stack});
  }else{
    next(err);
  }
}
function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else{
    next(err);
  }
}

function sequelizeErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({ message: err.message, errors: err.errors, statusCode: 409});
  } else {
    next(err);
  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler};
