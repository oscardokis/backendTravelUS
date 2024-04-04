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
        user: newUser,
        message: 'user created',
        token: token
      });
    } catch (error) {
      if(error.message.includes('User already exists')) {
        res.status(409).json({message: 'User already exists'});
      }
      if(error.message.includes('Email already exists')) {
        res.status(409).json({message: 'Email already exists'});
      }
      next(error);
    }
});

module.exports = router;
