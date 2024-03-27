const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const service = new UserService();

const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');

router.post('/signup', 
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const response = await service.createUser(body);
      res.status(201).json({
        data: response,
        message: 'user created'
      });
    } catch (error) {
      next(error.errors[0]);
    }
});

module.exports = router;
