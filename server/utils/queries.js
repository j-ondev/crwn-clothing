import db from '../services/database.js'
import { verifyToken } from '../helpers/auth.js'

export const Select = async (table, conditions, extra) => {
  let query = `SELECT * FROM ${table}`
  let values = []

  if (conditions) {
    query += ' WHERE '
    Object.entries(conditions).forEach((condition, index, array) => {
      const [column, value] = condition

      let addComma = true
      if (column === 'token') {
        const payload = verifyToken(value)

        if (!payload.error) query += `id = ${payload.sub}`
        else addComma = false
      } else {
        query += `${column} = $${index + 1}`
      }

      if (index + 1 !== array.length && addComma) query += ' AND '

      values.push(value)
    })
  }

  if (extra) query += ` ${extra}`

  return await db.query(query, values)
}

export const Insert = async (table, conditions, extra) => {
  if (conditions) {
    let columns = Object.keys(conditions)
    let values = Object.values(conditions)
    let query = `INSERT INTO ${table}(${columns}) VALUES(`

    for (let index = 1; index <= columns.length; index++) {
      query += '$' + index

      if (index !== columns.length) query += ','
    }

    query += ')'

    if (extra) query += ` ${extra}`

    query += ' RETURNING *'

    return await db.query(query, values)
  }

  return
}

export const CustomQuery = async (query, conditions) => {
  let values = []

  if (conditions) {
    query += ' WHERE '
    Object.entries(conditions[0]).forEach((condition, index, array) => {
      const [column, value] = condition

      let addComma = true
      query += `${conditions[1]}.${column} = $${index + 1}`

      if (index + 1 !== array.length && addComma) query += ' AND '

      values.push(value)
    })
  }

  return await db.query(query, values)
}
