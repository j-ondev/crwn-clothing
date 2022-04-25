const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/auth')
const db = require('../services/database')

// require('../services/jwtStrategy')

router.use('/auth', require('./auth'))
router.get('/test', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM USERS')
    return res.send(data)
  } catch (err) {
    res.send(err.stack)
  }
})
router.get('/profile', isAuthenticated, (req, res) => res.send(`Here's Your Data!`))

module.exports = router