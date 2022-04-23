const passport = require('passport')

const isAuthenticated = passport.authenticate('jwt', { session: false })

// function hasPermissions(req, res, next) {
//   const hasPermission = true

//   if(!hasPermission) {
//     return res.status(403).json({
//       error: `You don't have permission.`
//     })
//   }

//   next()
// }

module.exports = {
  isAuthenticated,
  // hasPermissions
}