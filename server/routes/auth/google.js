const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const { getEnv } = require('../../helpers/config')
const { verifyGoogleToken } = require('../../helpers/auth')
const { getUserBySocialId, addSocialUser } = require('../../graphql/users/users.model')

const isDevelopment = getEnv(['NODE_ENV'])[0] === 'development'
const [ secretOrPrivate ] = getEnv([isDevelopment ? 'JWT_SECRET_DEV' : 'JWT_SECRET_PROD'])

authRouter.post('/authenticate', async (req, res) => {
  const payload = await verifyGoogleToken(req.body.credential)
  if (credentials.error) res.status(500).json(payload.error)
  
  const { googleid, display_name, email, exp_time } = payload

  const user = await getUserBySocialId({
    socialId: googleid, provider: 'google'
  })

  const accessToken = jwt.sign({
    name: user.display_name,
    email: user.email
  }, secretOrPrivate, {
    subject: String(user.id),
    expiresIn: exp_time,
  })

  if (!user) {
    const result = await addSocialUser({
      socialId: googleid,
      display_name,
      email,
      provider: 'google'
    })

    if (result && result.errors) {
      const errors = result.errors.map(error => error.message)
      return res.status(500).json({ errors })
    }

    return res.status(201).json({ accessToken, exp_time })
  }

  return res.status(200).json({ accessToken, exp_time })
})

module.exports = authRouter