const { OAuth2Client } = require('google-auth-library')
const { getEnv } = require('./config')

const clientIdWeb = getEnv(['GCLIENT_ID_WEB'])
const googleClient = new OAuth2Client(clientIdWeb)

const verifyToken = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: clientIdWeb
  })

  const payload = ticket.getPayload()

  return {
    googleid: payload.sub,
    display_name: payload.name,
    email: payload.email,
    exp_time: payload.exp
  }
}

module.exports = verifyToken