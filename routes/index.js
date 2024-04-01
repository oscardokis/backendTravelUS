const express = require('express');
const userRouter = require('./users.router');
const authRouter = require('./auth.router');
const commentRouter = require('./comments.router');
const adventureRouter = require('./adventure.router');
const myTripsRouter = require('./my-trips.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use(`/user`, userRouter)
  router.use(`/auth`, authRouter)
  router.use(`/comments`, commentRouter)
  router.use(`/adventure`, adventureRouter)
  router.use(`/my-trips`, myTripsRouter)

}

module.exports = routerApi;