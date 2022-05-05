import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { isJwt } from '../utils/auth.js'

import { getEnv } from './config.js'

const isDevelopment = getEnv('NODE_ENV') === 'development'

const [clientIdWeb, secretOrPrivate] = getEnv([
  'GCLIENT_ID_WEB',
  isDevelopment ? 'JWT_SECRET_DEV' : 'JWT_SECRET_PROD',
])
const googleClient = new OAuth2Client(clientIdWeb)

export const verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: clientIdWeb,
    })

    const payload = ticket.getPayload()

    return {
      googleid: payload.sub,
      display_name: payload.name,
      email: payload.email,
      exp: payload.exp,
    }
  } catch (error) {
    return { error }
  }
}

export const generateToken = ({ display_name: name, email, id: subject }) => {
  if (!name || !email || !subject) return null

  const access_token = jwt.sign(
    {
      name,
      email,
    },
    secretOrPrivate,
    {
      subject: String(subject),
      expiresIn: '1h',
    }
  )

  const token = jwt.decode(access_token)

  return {
    access_token,
    exp: token.exp,
  }
}

export const verifyToken = (token) => {
  if (!isJwt(token)) return null

  return jwt.verify(token, secretOrPrivate)
}

export const hasPermissions = ({ permissions }, required) => {
  permissions = JSON.parse(permissions)

  const grantAccess = Object.entries(required).every(([k, v]) => {
    return permissions[k].includes(v) || permissions[k] === 'ALL'
  })

  return grantAccess
}
