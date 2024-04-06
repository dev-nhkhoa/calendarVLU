require('dotenv').config()

const express = require('express')
const {
  checkIsValidCalendar,
  readFile,
  saveFile,
  writeFile,
  handleWriteFileToCsv
} = require('../utils/handleFiles')
const {
  convertJson4LichThiCsv,
  convertJson4LichHocCsv
} = require('../utils/handleCalendar')
const router = express.Router()

const vluUrl = 'https://online.vlu.edu.vn'
const vluLoginUrl = `${vluUrl}/login`
const vluHomeUrl = `${vluUrl}/Home`

const handleGetVluCookie = async (req, res) => {
  try {
    const fetchVluServer = await fetch(vluUrl)
    const loginCookie = fetchVluServer.headers
      .getSetCookie()
      .toString()
      .split(';')[0]
    res.status(200).json(loginCookie)
  } catch (error) {
    res.status(500).json(error)
  }
}

const handleLoginToVlu = async (req, res) => {
  try {
    const { userId, cookie, username, password, lichType, yearStudy, termID } =
      req.query

    console.log(userId)
    console.log(cookie)
    console.log(username)
    console.log(password)
    console.log(lichType)
    console.log(yearStudy)
    console.log(termID)

    const saveFileName = userId + '.html'
    const applyCookieHeader = new Headers()
    applyCookieHeader.append('Cookie', cookie)

    const applyAuth = new FormData()
    applyAuth.append('txtTaiKhoan', username)
    applyAuth.append('txtMatKhau', password)

    // đăng nhập vào vlu
    await fetch(vluLoginUrl, {
      method: 'POST',
      headers: applyCookieHeader,
      body: applyAuth,
      redirect: 'follow'
    })

    const vluCalendar = await fetch(
      `${vluHomeUrl}/${lichType}?YearStudy=${yearStudy}&TermID=${termID}`,
      {
        method: 'GET',
        headers: applyCookieHeader,
        redirect: 'follow'
      }
    )

    const vluCalendarHtml = await vluCalendar.text()

    if (!saveFile(saveFileName, vluCalendarHtml)) {
      res.status(505).json(`Lỗi khi lưu file ${userId}.html`)
      return
    }

    if (!checkIsValidCalendar(saveFileName)) {
      res.status(507).json(`Đăng nhập thất bại!`)
      return
    }
    res.status(200).json('OK!')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const handleGetVluCalendar = (req, res) => {
  const { userId } = req.query
  const saveFileName = userId + '.html'
  res.send(readFile(saveFileName))
}

const handleGetVluCalendarJson = (req, res) => {
  const fileName = req.query.userId + '.json'
  res.send(JSON.parse(readFile(fileName)))
}

const handleExportCalendar2Csv = (req, res) => {
  const { userId, lichType } = req.query
  const fileName = userId + '.json'
  const lichThiFileName = userId + '-lichThi.csv'
  const lichHocFileName = userId + '-lichHoc.csv'
  if (lichType == 'ShowExam') {
    const lichThiData = convertJson4LichThiCsv(fileName)
    handleWriteFileToCsv(lichThiFileName, lichThiData, res)
    return
  }
  const lichHocData = convertJson4LichHocCsv(fileName)
  handleWriteFileToCsv(lichHocFileName, lichHocData, res)
}

router.get('/login-to-vlu', handleLoginToVlu)
router.get('/get-vlu-cookie', handleGetVluCookie)
router.get('/get-vlu-calendar', handleGetVluCalendar)
router.get('/get-vlu-calendar-json', handleGetVluCalendarJson)
router.get('/export-calendar-to-csv', handleExportCalendar2Csv)

module.exports = router
