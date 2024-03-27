const passport = require('passport');

// Differents strategy I wll use
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy)
passport.use(JwtStrategy)
