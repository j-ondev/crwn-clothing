const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.use(new GoogleStrategy({
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