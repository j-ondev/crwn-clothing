import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { getEnv } from '../utils/config.js'

import stripeRoute from '../routes/stripe.js'

const app = express()
const isDevelopment = getEnv('NODE_ENV') === 'development'

app.use(cors())
app.use(morgan('combined'))
app.use(
  helmet({
    crossOriginEmbedderPolicy: !isDevelopment,
    contentSecurityPolicy: !isDevelopment,
  })
)

app.use(express.json())

app.use('/stripe', stripeRoute)

export default app
