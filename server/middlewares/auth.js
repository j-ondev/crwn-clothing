function isAuthenticated(req, res, next) {
  const isLoggedIn = true
  
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!'
    })
  }

  next()
}

function hasPermissions(req, res, next) {
  const hasPermission = true

  if(!hasPermission) {
    return res.status(403).json({
      error: `You don't have permission.`
    })
  }

  next()
}