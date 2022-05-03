import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const app = express()
const isDevelopment = process.env.NODE_ENV === 'development'

app.use(cors())
app.use(morgan('combined'))
app.use(
  helmet({
    crossOriginEmbedderPolicy: !isDevelopment,
    contentSecurityPolicy: !isDevelopment,
  })
)

app.use(express.json())

export default app
