const { ApolloError } = require('apollo-server-express')
const db = require('../services/database')

exports.Query = async (query, values) => {
  return await db.query(query, values)
    .then((res) => res.rows)
    .catch(e => { throw new ApolloError(e.stack) })
}

exports.pgDate = (date) => new Date(date).toISOString()