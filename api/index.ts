import express from 'express'
import httpStatusCodes from 'http-status-codes'
import getAuthToken from './getAuthToken'

const app = express()

app.get('/api', (req, res) => {
  const token = getAuthToken(req)
  if (token) {
    res.json({ loggedIn: true })
  } else {
    res.status(httpStatusCodes.UNAUTHORIZED)
    res.json({ loggedIn: false })
  }
})

export default app
