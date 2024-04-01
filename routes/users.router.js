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
      const newUser = await service.createUser(body);
      const token  = await service.signToken(newUser);
      res.status(201).json({
        data: newUser,
        message: 'user created',
        token: token
      });
    } catch (error) {
      next(error.errors[0]);
    }
});

module.exports = router;
