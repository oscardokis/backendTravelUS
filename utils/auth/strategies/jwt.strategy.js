const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};


const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    if (payload.sub && Date.now() / 1000 < payload.exp) {
      return done(null, payload);
    }
    done(null, false);
  } catch (error) {
    console.log(error)
    done(error, false);
  }
});
module.exports = JwtStrategy;
