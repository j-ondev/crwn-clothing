const db = require('../../services/database')
const { ApolloError } = require('apollo-server-express')
const { isJwt } = require('../../utils/auth')
const { verifyToken } = require('../../helpers/auth')

const query = {
  text: '',
  values: []
}

exports.getAllUsers = async () => {
  query.text = 'SELECT * FROM users ORDER BY id ASC'
  
  try {
    const result = await db.query(query.text)
    return result.rows
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

exports.getUser = async (idOrToken) => {
  const token = verifyToken(idOrToken)
  const id = token?.sub || idOrToken

  if (token) {
    query.text = `SELECT * FROM users WHERE id = $1, display_name = $2, email = $3`
    query.values = [id, token.name, token.email]
  } else {
    query.text = `SELECT * FROM users WHERE id = $1`
    query.values = [id]
  }

  try {
    const result = await db.query(query.text, query.values)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

exports.getSocialUser = async (socialId, provider) => {  
  query.text = `SELECT * FROM users WHERE ${provider}id = $1`
  query.values = [socialId]
  
  try {
    const result = await db.query(query.text, query.values)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err)
  }
}

exports.authUser = async (email, password) => {
  query.text = 'SELECT * FROM users WHERE email = $1, password = $2'
  query.values = [email, password]

  try {
    const result = await db.query(query.text, query.values)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err)
  }
}

exports.addUser = async ({ display_name, email, password }) => {
  const columns = ['display_name', 'email', 'password']
  query.text = `INSERT INTO users(${columns}) VALUES($1, $2, $3) RETURNING *`
  query.values = [display_name, email, password]
  
  try {
    const result = await db.query(query.text, query.values)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}

exports.addGoogleUser = async ({ googleid, display_name, email }) => {
  const columns = ['googleid', 'display_name', 'email']
  query.text = `INSERT INTO users(${columns}) VALUES($1, $2, $3) RETURNING *`
  query.values = [googleid, display_name, email]
  
  try {
    const result = await db.query(query.text, query.values)
    return result.rows[0]
  } catch (err) {
    throw new ApolloError(err.stack)
  }
}