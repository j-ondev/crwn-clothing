const passport = require('passport')

const isAuthenticated = passport.authenticate('jwt', { session: false })

// export const checkPermissions = (req, res, next) => {  
//   const { permissions } = req.user

//   if (/* permissions */)
//     hasPermissions(permissions) ? next() : res.sendStatus(403)
//   else
//     return res.sendStatus(500)
// }

module.exports = {
  isAuthenticated,
  // checkPermissions
}