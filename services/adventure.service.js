const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index.js');
const { mainChatGpt } = require('../libs/requestChatGpt.js');

class AdventureService {
  constructor() {
      this.model = models.Adventure;
    }
  
    async create(adventure, user, token) {
      adventure.userId = user.sub;
      const verifyTokens = jwt.verify(token, config.jwtSecret);
      if (verifyTokens.sub !== user.sub) {
        throw boom.unauthorized('Invalid token');
      }
      // adventure should be an object with the following properties: city, state, month and activity
      const newAdventure = await mainChatGpt(adventure);
      // const newAdventure = await this.model.create(adventure);
      return newAdventure;
    }
  
    async findById(id) {
      const adventure = await this.model.findByPk(id);
      if (!adventure) {
        throw boom.notFound('Adventure not found');
      }
      return adventure;
    }
  
    async findAll() {
      const adventures = await this.model.findAll({ include: 
        [{ association: 'user', attributes: ['username']}], order: [['create_at', 'DESC']]});
      return adventures;
    }
}

module.exports = AdventureService;