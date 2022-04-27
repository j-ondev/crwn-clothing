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

  const token = jwt.sign({
    name: user.display_name,
    email: user.email
  }, secretOrPrivate, {
    subject: String(user.id),
    expiresIn: exp_time,
  })

  let errors = []
  let httpStatusCode = 500

  if (user) httpStatusCode = 200
  else {
    const result = await addSocialUser({
      socialId: googleid,
      display_name,
      email,
      provider: 'google'
    })

    if (result && result.errors)
      result.errors.map(error => errors.push(error.message))
    else
      httpStatusCode = 201
  }

  if(errors.length) return res.status(httpStatusCode).json({ errors })
  
  return res.status(httpStatusCode).json({ token, exp_time })
})

module.exports = authRouter