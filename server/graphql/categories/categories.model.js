import { ApolloError } from 'apollo-server-express'
import { Select } from '../../utils/queries.js'

const getAllCategories = async () => {
  try {
    const result = await Select('categories', null, 'ORDER BY title ASC')
    return result.rows
  } catch (err) {
    throw new ApolloError(err)
  }
}

const getCategory = async (filter) => {
  try {
    const result = await Select('categories', filter)
    return result.rows
  } catch (err) {
    throw new ApolloError(err)
  }
}

const categoriesModel = { getAllCategories, getCategory }

export { getAllCategories, getCategory }
export default categoriesModel
