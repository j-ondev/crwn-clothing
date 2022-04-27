const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/auth')
const db = require('../services/database')

// require('../services/jwtStrategy')

router.use('/auth', require('./auth'))
router.get('/profile', isAuthenticated, /*checkPermissions,*/ (req, res) => res.send(`Here's Your Data!`))

module.exports = router