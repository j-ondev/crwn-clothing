const { OAuth2Client } = require('google-auth-library')
const { getEnv } = require('../helpers/config')

const gcidWeb = getEnv(['GCID_WEB'])
const googleClient = new OAuth2Client(gcidWeb)

const verifyToken = async (token) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: gcidWeb
    })

    const payload = ticket.getPayload()

    return {
      googleid: payload.sub,
      display_name: payload.name,
      email: payload.email
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = verifyToken