import { ApolloError } from 'apollo-server-express'
import { Select } from '../../utils/queries.js'

const getAllProducts = async () => {
  try {
    const result = await Select('products', null, 'ORDER BY name ASC')
    return result.rows
  } catch (err) {
    throw new ApolloError(err)
  }
}

const getProduct = async (filter) => {
  try {
    const result = await Select('products', filter)
    return result.rows
  } catch (err) {
    throw new ApolloError(err)
  }
}

const productsModel = { getAllProducts, getProduct }

export { getAllProducts, getProduct }
export default productsModel
