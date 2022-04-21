const { ApolloServer } = require('apollo-server-express')
const schema = require('../graphql/schema')

async function startApolloServer(app) {
  const apolloServer = new ApolloServer({ schema })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  console.log(`Initialized apollo server...`)
}

module.exports = { startApolloServer }