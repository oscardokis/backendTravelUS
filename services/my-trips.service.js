const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index.js');

class MyTripsService {

  constructor() {
    this.model = models.MyTrips;
  }

  async findAll(user, token) {
    const userId = user.sub;
    const verifyTokens = jwt.verify(token, config.jwtSecret);
    if (verifyTokens.sub !== userId) {
      throw boom.unauthorized('Invalid token');
    }
    const myTrips = await this.model.findAll({
      where: { userId },
      include: [{ association: 'thingsToDo', attributes: ['activity', 'description', 'accessories', 'funFact'] }]
    });
    return myTrips;
  }

}

module.exports = MyTripsService;