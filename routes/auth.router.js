const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service.js');
const service = new AuthService();
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const { createNewPassword } = require('../schemas/user.schema');

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { token } = service.signToken(user);
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 }); // Set cookie
      res.json({ message: 'Login successful', user, token });
    } catch (error) {
      next(error);
    }
  }
);
router.get('/validate', 
  passport.authenticate('jwt', { session: false }), 
  (req, res, next) => {
    try {
      res.status(200).json({ message: 'Session is valid' });
    } catch (error) {
      next(error);
    }
});

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/change-password',
  validatorHandler(createNewPassword, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;