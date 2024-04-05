require('dotenv').config()

const express = require('express')
const router = express.Router()
const {
  saveFile,
  convertTable2JSON,
  readFile
} = require('../utils/handleFiles')

const fileHTML = 'file.html'
const fileJSON = 'converted.json'

router.get('/', (req, res) => {
  res.send('CalenVLU APIs V1 is working correctly!')
})

router.get('/get-cookie', (req, res, next) => {
  fetch('https://online.vlu.edu.vn').then((response) => {
    res.send(response.headers.getSetCookie().toString().split(';')[0])
  })
})

router.get('/get-calendar', async (req, res) => {
  const responseHeader = req.headers
  const cookie = responseHeader['calenvlu-cookie']
  const username =
    process.env.VLU_USERNAME || responseHeader['calenvlu-username']
  const password =
    process.env.VLU_PASSWORD || responseHeader['calenvlu-password']
  const year = responseHeader['calenvlu-year']
  const period = responseHeader['calenvlu-period']
  const lichHoc = responseHeader['calenvlu-lichhoc']
  console.log(username)
  const applyCookieHeader = new Headers()
  applyCookieHeader.append('Cookie', cookie)

  const applyAuth = new FormData()
  applyAuth.append('txtTaiKhoan', username)
  applyAuth.append('txtMatKhau', password)

  await fetch('https://online.vlu.edu.vn/login', {
    method: 'POST',
    headers: applyCookieHeader,
    body: applyAuth,
    redirect: 'follow'
  })

  const getOnlineCalendar = await fetch(
    `https://online.vlu.edu.vn/Home/${lichHoc}?YearStudy=${year}&TermID=${period}`,
    {
      method: 'GET',
      headers: applyCookieHeader,
      redirect: 'follow'
    }
  )

  const HTMLTable = await getOnlineCalendar.text()

  if (!saveFile(fileHTML, HTMLTable)) {
    console.log('Lỗi khi thực thi việc lưu file.html!')
    return
  } else {
    res.send(convertTable2JSON(HTMLTable))
  }
})

router.get('/get-calendar-json', (req, res) => {
  res.send(readFile(fileJSON))
})

module.exports = router
