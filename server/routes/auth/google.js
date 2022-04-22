const authRouter = require('express').Router()
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  /**
   * TODO: INSERIR PROFILE NO BANCO
   * profile: {
   *  id
   *  displayName
   *  emails: [ value, verified ]
   * }
   */
  done(null, profile)
}))

authRouter.get('/', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

authRouter.get('/callback', passport.authenticate('google', {
  failureRedirect: '/',
  session: false
}), (req, res) => {
  console.log(req.user)

  // TODO: JWT TOKEN

  res.redirect('/')
})

module.exports = authRouter