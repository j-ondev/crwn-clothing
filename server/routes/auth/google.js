const authRouter = require('express').Router()
const passport = require('passport')
const { generateJWT } = require('../../services/auth')

require('../../services/googleStrategy')

authRouter.get('/', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

authRouter.get('/callback', passport.authenticate('google', {
  failureRedirect: '/',
  session: false
}), (req, res) => {
  const user = {
    display_name: req.user.displayName,
    email: req.user._json.email,
    provider: req.user.provider
  }

  // TODO: REGISTER USER IN DB

  const token = generateJWT(user)

  res.json({
    success: true,
    token
  })
})

module.exports = authRouter