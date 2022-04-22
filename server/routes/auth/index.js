const authRouter = require('express').Router()

authRouter.use('/google', require('./google'))

// authRouter.get('/logout', require('./logout'))

module.exports = authRouter