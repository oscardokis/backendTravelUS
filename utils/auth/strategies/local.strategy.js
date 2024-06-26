const { Strategy } = require('passport-local');

const AuthService = require('./../../../services/auth.service.js');
const service = new AuthService();
const boom = require('@hapi/boom');

const LocalStrerategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password'

}, async (username, password, done) => {
  try {
    const user = await service.getUser(username, password);
    if (!user) {
      return done(boom.unauthorized('User not found'), false);
    }
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});



module.exports = LocalStrerategy;
