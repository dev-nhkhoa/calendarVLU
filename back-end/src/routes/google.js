require('dotenv').config()

const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const clientId = process.env.CLIENT_ID
const secrectId = process.env.SECRET_ID
const redirect = 'http://localhost:3000/google/get-token'

const oauth2Client = new google.auth.OAuth2(clientId, secrectId, redirect)

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
      res.redirect('http://localhost:5173/google-login')
      return
    }
    res.redirect(`http://localhost:5173/import-calendar`)
  })
})

module.exports = router
