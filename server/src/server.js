const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = require('./app')
const { startApolloServer } = require('./apollo')
const PORT = process.env.PORT || 4000

async function startServer() {
  await startApolloServer(app)
  
  const server = require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pem'))
  }, app)
  
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })
}

startServer()