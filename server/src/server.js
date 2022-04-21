const path = require('path')
require('dotenv').config()

const app = require('./app')
const { ApolloServer } = require('apollo-server-express')

const PORT = process.env.PORT || 8000

async function startServer() {
  const schema = require(path.join(__dirname, '..', 'graphql', 'schema.js'))
  const apolloServer = new ApolloServer({
    schema
  })
  
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })
}

startServer()