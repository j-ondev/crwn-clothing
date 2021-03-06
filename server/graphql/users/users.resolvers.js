import usersModel from './users.model.js'
import {
  verifyGoogleToken,
  generateToken,
  authorizeUser,
  verifyToken,
} from '../../helpers/auth.js'
import { isJwt } from '../../utils/auth.js'

export default {
  Query: {
    Users: async (_, __, ctx) => {
      const { rejected } = authorizeUser(ctx.user, { users: 'R' })
      if (rejected) return { __typename: 'UserError', ...rejected }

      const users = await usersModel.getAllUsers()
      return users
    },
    User: async (_, { filter }, ctx) => {
      if (!ctx.user)
        return {
          __typename: 'UserError',
          code: 'user/unauthorized',
          message: 'You must be logged in to perform this action.',
        }

      let requiredPermission = { users: 'R' }

      if (filter.token && isJwt(filter.token)) {
        const payload = verifyToken(filter.token)

        filter = {
          id: payload.sub,
          display_name: payload.name,
          email: payload.email,
        }
      }

      const users = await usersModel.getUser(filter)

      if (users.length) {
        if (users.length === 1 && users[0].id === ctx.user.id)
          requiredPermission = { users: 'self' }

        const { rejected } = authorizeUser(ctx.user, requiredPermission)

        return rejected
          ? { __typename: 'UserError', ...rejected }
          : { __typename: 'UserArray', users }
      } else {
        return {
          __typename: 'UserError',
          code: 'user/not-found',
        }
      }
    },
    SocialUser: async (_, { socialId, provider }) => {
      const user = await usersModel.getSocialUser(socialId, provider)

      if (user)
        return {
          __typename: 'User',
          ...user,
        }
      else
        return {
          __typename: 'UserError',
          code: 'user/not-found',
        }
    },
  },
  Mutation: {
    AddUser: async (_, args) => {
      const user = await usersModel.addUser(args)

      const token = generateToken(user)

      if (token)
        return {
          __typename: 'JsonWebToken',
          ...token,
        }
      else
        return {
          __typename: 'UserError',
          code: 'user/invalid-token',
        }
    },
    SignIn: async (_, args) => {
      if (!args.email || !args.password)
        return {
          __type: 'UserError',
          code: 'user/invalid-request',
          message: 'Username and password cannot be empty',
        }

      const user = (await usersModel.getUser(args))[0]

      if (!user.length === 1)
        return {
          __typename: 'UserError',
          code: 'user/not-found',
        }

      const token = generateToken(user)

      if (token)
        return {
          __typename: 'JsonWebToken',
          ...token,
        }
      else
        return {
          __typename: 'UserError',
          code: 'user/invalid-token',
        }
    },
    SignUpGoogle: async (_, { credential }) => {
      const validCredential = isJwt(credential)

      if (validCredential) {
        const { googleid, display_name, email } = await verifyGoogleToken(
          credential
        )

        if (!googleid)
          return {
            __typename: 'UserError',
            code: 'user/tampered-token',
          }

        const user = await usersModel.addUser({ googleid, display_name, email })

        const token = generateToken(user)

        if (token)
          return {
            __typename: 'JsonWebToken',
            ...token,
          }
        else
          return {
            __typename: 'UserError',
            code: 'user/invalid-token',
          }
      } else {
        return {
          __typename: 'UserError',
          code: 'user/invalid-request',
          message: 'Invalid google credential format',
        }
      }
    },
    SignInGoogle: async (_, { credential }) => {
      const validCredential = isJwt(credential)

      if (validCredential) {
        const payload = await verifyGoogleToken(credential)
        const user = await usersModel.getSocialUser(payload.googleid, 'google')

        if (!user)
          return {
            __typename: 'UserError',
            code: 'user/not-found',
          }

        const token = generateToken(user)

        if (token)
          return {
            __typename: 'JsonWebToken',
            ...token,
          }
        else
          return {
            __typename: 'UserError',
            code: 'user/invalid-token',
          }
      } else {
        return {
          __typename: 'UserError',
          code: 'user/invalid-request',
          message: 'Invalid google credential format',
        }
      }
    },
    RenewToken: async (_, __, ctx) => {
      if (!ctx.user)
        return {
          __typename: 'UserError',
          code: 'user/unauthorized',
          message: 'You must be logged in to perform this action.',
        }

      const token = generateToken(ctx.user)

      if (token)
        return {
          __typename: 'JsonWebToken',
          ...token,
        }
      else
        return {
          __typename: 'UserError',
          code: 'user/invalid-token',
        }
    },
  },
}
