import 'dotenv/config'

import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

import app from './app.js'
import { getEnv } from '../utils/config.js'
import { startApolloServer } from './apollo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = +getEnv('PORT') || 4000

async function startServer() {
  await startApolloServer(app)

  const server = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pem')),
    },
    app
  )

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
  })
}

startServer()
