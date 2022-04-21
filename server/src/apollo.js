const { ApolloServer, gql } = require('apollo-server-express')
// const schema = require(path.join(__dirname, 'graphql', 'schema.js'))

async function startApolloServer(app) {
  const apolloServer = new ApolloServer({
    // schema
    typeDefs: gql`
      type Query {
        hello: String
      }
    `
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
}

module.exports = { startApolloServer }