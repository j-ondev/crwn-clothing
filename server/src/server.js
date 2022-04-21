require('dotenv').config()

const app = require('./app')
const { startApolloServer } = require('./apollo')

const PORT = process.env.PORT || 8000

async function startServer() {
  await startApolloServer(app)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })
}

startServer()