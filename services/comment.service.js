const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index.js');

class CommentService {

  constructor() {
    this.model = models.Comment;
  }

  async create(comment, user, token) {
    comment.userId = user.sub;
    const verifyTokens = jwt.verify(token, config.jwtSecret);
    console.log(verifyTokens);
    if (verifyTokens.sub !== user.sub) {
      throw boom.unauthorized('Invalid token');
    }
    const newComment = await this.model.create(comment);
    return newComment;
  }

  async findById(id) {
    const comment = await this.model.findByPk(id);
    if (!comment) {
      throw boom.notFound('Comment not found');
    }
    return comment;
  }

  async findAll() {
    const comments = await this.model.findAll();
    return comments;
  }


}
module.exports = CommentService;
