const jwt = require('jsonwebtoken')

const isDevelopment = process.env.NODE_ENV === 'development'

const secretOrKey = isDevelopment ?
  process.env.JWT_SECRET_DEV : process.env.JWT_SECRET_PROD

const generateJWT = (payload) => {
  return jwt.sign(payload, secretOrKey, {
    expiresIn: 604800
  });
}

module.exports = {
  generateJWT
}