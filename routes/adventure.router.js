const express = require('express');
const router = express.Router();
const passport = require('passport');

const AdventureService = require('../services/adventure.service.js');
const service = new AdventureService();

const validatorHandler = require('../middlewares/validator.handler');
const { createAdventureSchema } = require('../schemas/adventure.schema');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createAdventureSchema, 'body'),
  async (req, res, next) => {
    try {
      const adventure = req.body;
      const { user } = req;
      const token = req.headers.authorization.split(' ')[1];
      const response = await service.create(adventure, user, token);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/all', async (req, res, next) => {
  try {
    const response = await service.findAll();
    res.json(response);
  } catch (error) {
    next(error);
  }
})



module.exports = router;
