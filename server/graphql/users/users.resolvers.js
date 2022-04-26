const usersModel = require('./users.model')

module.exports = {
  Query: {
    users: () => {
      return usersModel.getAllUsers()
    },
    user: (_, args) => {
      return usersModel.getUserById(args.id)
    },
    userBySocialId: (_, args) => {
      return usersModel.getUserBySocialId(args)
    }
  },
  Mutation: {
    addSocialUser: (_, args) => {
      return usersModel.addSocialUser(args)
    }
  }
}