const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const schema = require('../graphql/schema')
const { getUser } = require('../graphql/users/users.model')

async function startApolloServer(app) {
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // const token = req.headers.authorization || ''
      // const user = await getUser(token)

      // return { user }
    }
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  console.log(`Initialized apollo server...`)
}

module.exports = { startApolloServer }