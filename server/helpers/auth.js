import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

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
  return jwt.verify(token, secretOrPrivate, (err, decoded) => {
    if (err) return { error: err }

    return decoded
  })
}

export const hasPermissions = (user, requestedPermissions) => {
  const permissions = user.permissions

  const grantAccess = Object.entries(requestedPermissions).reduce(
    (bool, permission) => {
      const [k, v] = permission

      if (bool === true) {
        if (v === 'self')
          return permissions[k].includes(v) || permissions[k].includes('R')

        return permissions[k].includes(v) || permissions[k].includes('ALL')
      }

      return false
    },
    true
  )

  return grantAccess
}

export const authorizeUser = (user, permissions) => {
  if (!user)
    return {
      rejected: {
        code: 'user/unauthorized',
        message: 'You must be logged in to perform this action.',
      },
    }

  if (permissions) {
    if (!hasPermissions(user, { ...permissions, products: 'R' }))
      return {
        rejected: {
          code: 'user/forbidden',
          message: `You don't have enough permissions to perform this action.`,
        },
      }
  }

  return { rejected: false }
}
