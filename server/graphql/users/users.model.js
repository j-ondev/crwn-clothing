const { ApolloError } = require('apollo-server-express')
const { Select, Insert } = require('../../utils/queries')

exports.getAllUsers = async () => {  
  try {
    const result = await Select('users', null, 'ORDER BY id ASC')
    return result.rows
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

exports.getUser = async (conditions) => {
  try {
    const result = await Select('users', conditions)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

exports.getSocialUser = async (socialId, provider) => {  
  try {
    const result = await Select('users', {
      [`${provider}id`]: socialId
    })
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err)
  }
}

exports.addUser = async (conditions) => {  
  try {
    const result = await Insert('users', conditions)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}