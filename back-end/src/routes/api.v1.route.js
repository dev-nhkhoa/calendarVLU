const express = require('express')
const cors = require('cors')

const {
  unlinkFiles,
  saveFile,
  convertTable2JSON,
  readFile
} = require('../utils/handleFiles')

const router = express.Router()

router.use(cors())

router.get('/', (req, res, next) => {
  res.send('CalenVLU APIs V1 is working correctly!')
})

router.get('/get-cookie', (req, res, next) => {
  unlinkFiles()
  fetch('https://online.vlu.edu.vn').then((response) => {
    res.send(response.headers.getSetCookie().toString().split(';')[0])
  })
})

router.get('/get-calendar', async (req, res) => {
  const responseHeader = req.headers
  const cookie = responseHeader['calenvlu-cookie']
  const username =
    responseHeader['calenvlu-username'] || process.env.TEST_ONLINE_USERNAME
  const password =
    responseHeader['calenvlu-password'] || process.env.TEST_ONLINE_PASSWORD
  const year = responseHeader['calenvlu-year']
  const period = responseHeader['calenvlu-period']
  const lichHoc = responseHeader['calenvlu-lichhoc']

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

  if (!saveFile(process.env.FILE_HTML, HTMLTable)) {
    console.log('Lỗi khi thực thi việc lưu file.html!')
    return
  } else {
    res.send(convertTable2JSON(HTMLTable))
  }
})

router.get('/get-calendar-json', (req, res) => {
  res.send(readFile(process.env.FILE_JSON))
})

module.exports = router
