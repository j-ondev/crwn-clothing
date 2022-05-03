import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import schema from '../graphql/schema.js'
import { getUser } from '../graphql/users/users.model.js'

async function startApolloServer(app) {
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // const token = req.headers.authorization || ''
      // const user = await getUser(token)
      // return { user }
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  console.log(`Initialized apollo server...`)
}

export { startApolloServer }
