const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class UserService {

  async createUser(data) {
    const user = await models.User.findOne({
      where: {
        username: data.username
      }
    });
    if(user) {
      throw boom.badRequest('User already exists');
    }
    const email = await models.User.findOne({
      where: {
        email: data.email
      }
    });
    if(email) {
      throw boom.badRequest('Email already exists');
    }
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }
  async signToken(newUser) {
    const payload = {
      sub: newUser.dataValues.id
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    return token;
  }
  async findByUserName(username) {
    const user = await models.User.findOne({
      where: {
        username
      }
    });
    return user;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
  async findOneByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email
      }
    });
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UserService;
