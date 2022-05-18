import productsModel from './products.model.js'

export default {
  Query: {
    Products: async () => {
      const products = await productsModel.getAllProducts()
      return products
    },
    Product: async (_, { filter }) => {
      const products = await productsModel.getProduct(filter)

      if (products.length) {
        return {
          __typename: 'ProductArray',
          products,
        }
      } else {
        return {
          __typename: 'ProductError',
          code: 'product/not-found',
        }
      }
    },
  },
}
