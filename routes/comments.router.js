const express = require('express');
const router = express.Router();
const passport = require('passport');


const CommentService = require('../services/comment.service.js');
const service = new CommentService();

const validatorHandler = require('../middlewares/validator.handler');
const { createCommentSchema } = require('../schemas/comment.schema');

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const comment = req.body;
      const { user } = req;
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const response = await service.create(comment, user, token);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
