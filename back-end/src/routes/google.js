require('dotenv').config()

const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const clientId = process.env.CLIENT_ID
const secrectId = process.env.SECRET_ID
const redirectServer =
  process.env.REDIRECT_SERVER != undefined
    ? `${process.env.REDIRECT_SERVER}/google/get-token`
    : 'http://localhost:3000/google/get-token'
const redirectClient =
  process.env.REDIRECT_CLIENT != undefined
    ? `${process.env.REDIRECT_CLIENT}`
    : 'http://localhost:5173'

const oauth2Client = new google.auth.OAuth2(clientId, secrectId, redirectServer)

router.get('/authenticate', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar'
  })

  res.redirect(url)
})

router.get('/get-token', (req, res) => {
  const code = req.query.code
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log(err)
      res.redirect(`${redirectClient}/`)
      return
    }
    res.redirect(`${redirectClient}/vlu-login`)
    oauth2Client.setCredentials(tokens)
  })
})

module.exports = router
