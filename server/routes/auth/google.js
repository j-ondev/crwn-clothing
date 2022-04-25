const authRouter = require('express').Router()

const verifyToken = require('../../services/googleAuth')
const db = require('../../services/database')

authRouter.post('/w', async (req, res) => {
  const { tokenId } = req.body
  const googleUser = await verifyToken(tokenId)
  
  if (googleUser.error) {
    return res.status(500).json({ error: googleUser.error })
  }

  try {
    const { rows: user } =
      await db.query(`SELECT * FROM users WHERE email='${googleUser.email}'`)

    if (user && user.length === 1) {
      const updateTime = new Date(Date.now())
      const query = 'UPDATE users SET token = $1, updated_at = $2 WHERE email = $3'
      const values = [ tokenId, updateTime, googleUser.email ]

      db.query(query, values, (error) => {
        if (error) {
          return res.status(500).json({ error: error.stack })
        }

        return res.status(200).json({
          success: 'Logged in.'
        })
      })
    } else {
      const query = 'INSERT INTO users(googleid, display_name, email, token) VALUES($1, $2, $3, $4)'
      const values = [...Object.values(googleUser), tokenId]
      
      db.query(query, values, (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.stack })
        }

        return res.status(201).json(result.rows[0])
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.stack })
  }
})

module.exports = authRouter