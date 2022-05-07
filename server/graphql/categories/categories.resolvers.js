import categoriesModel from './categories.model.js'

export default {
  Query: {
    Categories: async () => {
      const categories = await categoriesModel.getAllCategories()

      if (!categories.length) return null

      return categories
    },
    Category: async (_, { filter }) => {
      const category = await categoriesModel.getCategory(filter)

      if (category) {
        return {
          __typename: 'Category',
          category,
        }
      } else {
        return {
          __typename: 'CategoryError',
          code: 'category/not-found',
        }
      }
    },
  },
}
