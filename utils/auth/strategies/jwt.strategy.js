const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies.jwt,
  ]),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    if (payload.sub) {
      return done(null, payload);
    }
    done(null, false);
  } catch (error) {
    done(error, false);
  }
});

module.exports = JwtStrategy;
