import merge from 'lodash/merge.js'
import { loadSchema } from '@graphql-tools/load'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

import scalarsResolvers from './scalars/scalars.resolvers.js'
import usersResolvers from './users/users.resolvers.js'
import productsResolvers from './products/products.resolvers.js'

const typeDefs = await loadSchema('**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = merge(scalarsResolvers, usersResolvers, productsResolvers)

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
