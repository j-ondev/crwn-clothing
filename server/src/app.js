const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport')

const app = express()
const isDevelopment = process.env.NODE_ENV === 'development'

app.use(cors())
app.use(morgan('combined'))
app.use(helmet({
  crossOriginEmbedderPolicy: !isDevelopment,
  contentSecurityPolicy: !isDevelopment
}))

app.use(passport.initialize())

app.use(express.json())
app.use('/', require('../routes'))

module.exports = app