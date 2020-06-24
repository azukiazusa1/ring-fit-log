import fs from 'fs'
import https from 'https'
import consola from 'consola'
import express from 'express'

const { Nuxt, Builder } = require('nuxt')
const app = express()

const config = require('../nuxt.config.js')

config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  const httpsOptions = {
    key: fs.readFileSync(`${__dirname}/localhost-key.pem`),
    cert: fs.readFileSync(`${__dirname}/localhost.pem`)
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  // app.listen(port, host)
  https.createServer(httpsOptions, app).listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
