const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

module.exports = makeExecutableSchema({
  typeDefs: loadFilesSync(path.join(__dirname, '**/*.graphql')),
  resolvers: loadFilesSync(path.join(__dirname, '**/*.resolvers.js'))
})