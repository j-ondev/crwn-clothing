const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { getEnv } = require('../../helpers/config')

const isDevelopment = getEnv('NODE_ENV') === 'development'
const secretOrPrivate = getEnv(isDevelopment ? 'JWT_SECRET_DEV' : 'JWT_SECRET_PROD')

authRouter.post('/generateToken', (req, res) => {
  const { name, email, subject } = req.body

  const accessToken = jwt.sign({
    name,
    email
  }, secretOrPrivate, {
    subject,
    expiresIn: '1h'
  })

  console.log(jwt.decode(accessToken))

  return res.status(200).send(accessToken)
})

module.exports = authRouter