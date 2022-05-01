const authRouter = require('express').Router()

authRouter.post('/logout', async (req, res) => {
  console.log('Exited')
})

module.exports = authRouter