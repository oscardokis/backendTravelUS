const express = require('express');
const router = express.Router();
const passport = require('passport');

const MyTripsService = require('../services/my-trips.service');
const myTripsService = new MyTripsService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const token = req.headers.authorization.split(' ')[1];
      const myTrips = await myTripsService.findAll(user, token);
      res.status(200).json(myTrips);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
