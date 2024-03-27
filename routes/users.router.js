const express = require('express');

const UserService = require('../services/user.service');
const router = express.Router();
const service = new UserService();

router.post('/signup', async (req, res, next) => {
  try {
    const { body } = req;
    const response = await service.createUser(body);
    res.status(201).json({
      data: response,
      message: 'user created'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const response = await service.loginUser(body);
    res.status(200).json({
      data: response,
      message: 'user logged'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
