const usersModel = require('./users.model')

module.exports = {
  Query: {
    users: async () => {
      return await usersModel.getAllUsers()
    },
    user: async (_, args) => {
      return await usersModel.getUserById(args)
    },
    socialUser: async (_, { identifier, provider }) => {
      return await usersModel.getSocialUser(identifier, provider)
    }
  },
  Mutation: {
    AddGoogleUser: async (_, args) => {
      return await usersModel.addGoogleUser(args)
    }
  }
}