require('dotenv').config()

const app = require('./app')
const { startApolloServer } = require('./apollo')
const PORT = process.env.PORT || 4000

async function startServer() {
  await startApolloServer(app)
  
  const server = require('http').createServer(app)
  
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })
}

startServer()