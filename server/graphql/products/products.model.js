import { ApolloError } from 'apollo-server-express'
import { Select, CustomQuery } from '../../utils/queries.js'

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
    const result = await CustomQuery(
      `
      SELECT
        p.*, c.title AS category_name
      FROM
        products p
      INNER JOIN categories c
        ON p.category = c.id
    `,
      [filter, 'p']
    )
    return result.rows
  } catch (err) {
    throw new ApolloError(err)
  }
}

const productsModel = { getAllProducts, getProduct }

export { getAllProducts, getProduct }
export default productsModel
