const { Query, pgDate } = require('../../helpers/pg')

const query = {
  text: '',
  values: []
}

exports.getAllUsers = async () => {
  query.text = 'SELECT * FROM users ORDER BY id ASC'

  return await Query(query.text)
}

exports.getUserById = async ({ id }) => {
  query.text = 'SELECT * FROM users WHERE id = $1'
  query.values = [id]

  return (await Query(query.text, query.values))[0]
}

exports.getSocialUser = async (identifier, provider) => {  
  query.text = `SELECT * FROM users WHERE ${provider}id = $1`
  query.values = [identifier]

  return (await Query(query.text, query.values))[0]
}

// exports.addUser = ({ }) => {
//   query.name = 'add-user'
//   query.text = `INSERT INTO users(display_name) VALUES($1, $2, $3)`
//   query.values = []

//   return Query(query.text, query.values)
// }

exports.addGoogleUser = async ({ googleid, display_name, email }) => {
  const columns = ['googleid', 'display_name', 'email']
  query.text = `INSERT INTO users(${columns}) VALUES($1, $2, $3) RETURNING *`
  query.values = [googleid, display_name, email]

  const result = await Query(query.text, query.values)
  return result
}