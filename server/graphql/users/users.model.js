const { ApolloError } = require('apollo-server-express')
const db = require('../../services/database')

async function getAllUsers() {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC')
    return result.rows
  } catch (error) {
    throw new ApolloError(error)
  }
}

async function getUserById(id) {
  try { 
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] 
  } catch (error) {
    throw new ApolloError(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById
}