const Pool = require('pg').Pool
const {
  DB_USER: user,
  DB_HOST: host,
  DB_NAME: database,
  DB_PWD: password,
  DB_PORT: port
} = process.env

const db = new Pool({ user, host, database, password, port })

module.exports = db