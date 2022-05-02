const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const { isJwt } = require('../utils/auth')

const { getEnv } = require('./config')

const isDevelopment = getEnv('NODE_ENV') === 'development'

const [clientIdWeb, secretOrPrivate] = getEnv([
  'GCLIENT_ID_WEB',
  isDevelopment? 'JWT_SECRET_DEV' : 'JWT_SECRET_PROD'
])
const googleClient = new OAuth2Client(clientIdWeb)

exports.verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: clientIdWeb
    })

    const payload = ticket.getPayload()

    return {
      googleid: payload.sub,
      display_name: payload.name,
      email: payload.email,
      exp: payload.exp
    }
  } catch (error) {
    return { error }
  }
}

exports.generateToken = ({ display_name: name, email, id: subject }) => {
  const access_token = jwt.sign({
    name,
    email
  }, secretOrPrivate, {
    subject: String(subject),
    expiresIn: '1h'
  })

  const token = jwt.decode(access_token)

  return {
    access_token,
    exp: token.exp
  }
}

exports.verifyToken = (token) => {
  if(!isJwt(token)) return null

  return jwt.verify(token, secretOrPrivate)
}

exports.hasPermissions = ({ permissions }, required) => {
  permissions = JSON.parse(permissions)

  const grantAccess = Object.entries(required).every(([k, v]) => {
    return permissions[k].includes(v) || permissions[k] === 'ALL'
  })

  return grantAccess
}