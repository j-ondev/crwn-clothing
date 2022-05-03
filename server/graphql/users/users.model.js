import { ApolloError } from 'apollo-server-express'
import { Select, Insert } from '../../utils/queries.js'

const getAllUsers = async () => {
  try {
    const result = await Select('users', null, 'ORDER BY id ASC')
    return result.rows
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

const getUser = async (conditions) => {
  try {
    const result = await Select('users', conditions)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

const getSocialUser = async (socialId, provider) => {
  try {
    const result = await Select('users', {
      [`${provider}id`]: socialId,
    })
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err)
  }
}

const addUser = async (conditions) => {
  try {
    const result = await Insert('users', conditions)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

const usersModel = { getAllUsers, getUser, getSocialUser, addUser }

export { getAllUsers, getUser, getSocialUser, addUser }
export default usersModel
