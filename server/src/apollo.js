import { ApolloServer } from 'apollo-server-express'
import schema from '../graphql/schema.js'
import { getUser } from '../graphql/users/users.model.js'
import { verifyToken } from '../helpers/auth.js'

async function startApolloServer(app) {
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const accessToken = req.headers.authorization || null

      if (accessToken) {
        const decodedToken = verifyToken(accessToken)

        if (decodedToken.error) return

        const user = (
          await getUser({
            id: decodedToken.sub,
            display_name: decodedToken.name,
            email: decodedToken.email,
          })
        )[0]

        return { user }
      }
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  console.log(`Initialized apollo server...`)
}

export { startApolloServer }
