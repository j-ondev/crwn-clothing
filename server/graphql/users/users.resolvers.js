const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server-express')

const usersModel = require('./users.model')
const {
  verifyGoogleToken,
  generateToken,
  hasPermissions
} = require('../../helpers/auth')
const { isJwt } = require('../../utils/auth')

module.exports = {
  Query: {
    Users: async (_, __, ctx) => {
      // if (!ctx.user) throw new AuthenticationError('You must be logged in')
      // if (!hasPermissions(ctx.user, { users: 'R' } ))
      //   throw new ForbiddenError(`You don't have enough permission`)

      const user = await usersModel.getAllUsers()
      return user
    },
    User: async (_, args) => {
      const id = Math.abs(+args.id)
      if (id < 1) throw new UserInputError('Invalid argument value')

      const user = await usersModel.getUser(id)
      return user
    },
    SocialUser: async (_, { socialId, provider }) => {
      const user = await usersModel.getSocialUser(socialId, provider)
      return user
    }
  },
  Mutation: {
    AddUser: async(_, args) => {
      const user = await usersModel.addUser(args)

      const token = generateToken(user)

      return token
    },
    Login: async(_, { email, password }) => {
      const user = await usersModel.getUser({ email, password })

      if (!user) throw new AuthenticationError('Invalid username or password')
      const token = generateToken(user)

      return token
    },
    SignUpGoogle: async (_, { credential }) => {
      const validCredential = isJwt(credential)

      if (validCredential) {
        const { googleid, display_name, email } = await verifyGoogleToken(credential)
        const user = await usersModel.addUser({ googleid, display_name, email })

        const token = generateToken(user)

        return token
      } else throw new UserInputError('Invalid google credential format')
    },
    SignInGoogle: async (_, { credential }) => {
      const validCredential = isJwt(credential)

      if (validCredential) {
        const payload = await verifyGoogleToken(credential)
        const user = await usersModel.getSocialUser(payload.googleid, 'google')

        if (!user) return null

        const token = generateToken(user)

        return token
      } else throw new UserInputError('Invalid google credential format')
    }
  }
}