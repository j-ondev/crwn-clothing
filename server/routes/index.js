const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/auth')

require('../services/jwtStrategy')

router.use('/auth', require('./auth'))
router.get('/profile', isAuthenticated, (req, res) => res.send(`Peek a boo!`))

module.exports = router