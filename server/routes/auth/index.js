const authRouter = require('express').Router()
const { verifyGoogleToken } = require('../../helpers/auth')

authRouter.post('/google', async (req, res) => {
  const payload = await verifyGoogleToken(req.body.credential)
  if (payload.error) return res.status(500).json(payload.error)
  return res.status(200).json(payload)
})

authRouter.use('/local', require('./local'))
// authRouter.get('/logout', require('./logout'))

module.exports = authRouter