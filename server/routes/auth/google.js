const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const { getEnv } = require('../../helpers/config')
const verifyToken = require('../../helpers/googleAuth')
const { getUserBySocialId, addSocialUser, updateUserToken } = require('../../graphql/users/users.model')

const isDevelopment = getEnv(['NODE_ENV'])[0] === 'development'
const [ secretOrPrivate ] = getEnv([isDevelopment ? 'JWT_SECRET_DEV' : 'JWT_SECRET_PROD'])

authRouter.post('/verify', (req, res) => {
  const { credential } = req.body
  
  verifyToken(credential)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }))
})

authRouter.post('/authenticate', async (req, res) => {
  const { googleid, display_name, email, exp_time } = req.body

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

  if (user) {
    const result = await updateUserToken({
      id: user.id,
      token
    })

    if (result && result.errors)
      result.errors.map(error => errors.push(error.message))
    else
      httpStatusCode = 200
  } else {
    const result = await addSocialUser({
      socialId: googleid,
      display_name,
      email,
      token,
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