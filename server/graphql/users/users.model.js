const { Query, pgDate } = require('../../helpers/pg')

const query = {
  text: '',
  values: []
}

exports.getAllUsers = async () => {
  query.text = 'SELECT * FROM users ORDER BY id ASC'

  return await Query(query.text)
}

exports.getUserById = async (id) => {
  query.text = 'SELECT * FROM users WHERE id = $1'
  query.values = [id]

  return (await Query(query.text, query.values))[0]
}

exports.getUserBySocialId = async ({ socialId, provider }) => {
  query.text = `SELECT * FROM users WHERE ${provider}id = $1`
  query.values = [socialId]

  return (await Query(query.text, query.values))[0]
}

// exports.addUser = ({ }) => {
//   query.name = 'add-user'
//   query.text = `INSERT INTO users(display_name) VALUES($1, $2, $3)`
//   query.values = []

//   return Query(query.text, query.values)
// }

exports.addSocialUser = async ({ socialId, display_name, email, provider }) => {
  const columns = [`${provider}id`, 'display_name', 'email']
  query.text = `INSERT INTO users(${columns}) VALUES($1, $2, $3)`
  query.values = [socialId, display_name, email]

  return await (Query(query.text, query.values))[0]
}