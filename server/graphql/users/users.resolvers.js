const usersModel = require('./users.model')

module.exports = {
  Query: {
    users: () => {
      return usersModel.getAllUsers()
    },
    user: (_, args) => {
      return usersModel.getUserById(args.id)
    }
  }
}