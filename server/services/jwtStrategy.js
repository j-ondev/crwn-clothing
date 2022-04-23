const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const isDevelopment = process.env.NODE_ENV === 'development'
const secretOrKey = isDevelopment ? process.env.JWT_SECRET_DEV : process.env.JWT_SECRET_PROD

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  },
  (payload, done) => {
    // SOME LOGIC TO CHECK IF IT'S THE RIGHT PERSON WITH THE RIGHT PRIVILEGES
    return done(null, payload)
  },
))