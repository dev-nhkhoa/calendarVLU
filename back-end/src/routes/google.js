require('dotenv').config()

const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const {
  readFile,
  removeThings,
  convertDate,
  convertTime,
  calcDate,
  convertExamDate,
  addTime
} = require('../utils/handleFiles')
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
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

router.get('/authenticate', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar',
    include_granted_scopes: true
  })

  res.redirect(url)
})

router.get('/get-token', (req, res) => {
  const code = req.query.code
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.log(err)
      res.redirect(`${redirectClient}/`)
      return
    }
    oauth2Client.setCredentials(token)
    res.redirect(`${redirectClient}/vlu-login?token=${token.access_token}`)
  })
})

router.get('/calendar', async (req, res) => {
  const token = req.headers['vlu-token']
  const calendarName = req.headers['vlu-calendarname']
  console.log(req.headers['vlu-calendarname'])
  const isLichThi = req.headers['vlu-islichthi'] == 'true' ? true : false
  const calendarJson = await JSON.parse(readFile('converted.json'))
  try {
    oauth2Client.setCredentials({ access_token: token })
    // Create a Google Calendar API client
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Gửi yêu cầu tạo lịch mới
    const createNewCalendar = await calendar.calendars.insert({
      auth: oauth2Client,
      requestBody: {
        summary: calendarName,
        timeZone: '+07:00'
      }
    })

    const newCalendarId = await createNewCalendar.data.id
    const newCalendar = await removeThings(calendarJson, isLichThi)

    console.log(newCalendar)

    for (let i = 0; i < newCalendar.length; i++) {
      // Gửi yêu cầu thêm sự kiện mới
      if (!isLichThi) {
        console.log(newCalendar[i])
        const name = `${newCalendar[i]['Tên học phần']} - ${newCalendar[i]['Phòng']}`
        const desc = `Giảng viên: ${newCalendar[i]['CBGD']} - Số tín chỉ: ${newCalendar[i]['STC']}`
        const location = `${newCalendar[i]['Phòng']}`
        const time = convertTime(newCalendar[i]['Tiết'])
        const dayOfWeek = convertDate(newCalendar[i]['Thứ'])
        const weekList = newCalendar[i]['Tuần'].split(',')
        for (let k = 0; k < weekList.length; k++) {
          const date = calcDate(dayOfWeek, weekList[k])

          var textEvent = {
            summary: name,
            location: location,
            description: desc,
            start: {
              dateTime: `${date}T${time[0]}+07:00`,
              timeZone: 'Asia/Ho_Chi_Minh'
            },
            end: {
              dateTime: `${date}T${time[1]}+07:00`,
              timeZone: 'Asia/Ho_Chi_Minh'
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
              ]
            }
          }

          calendar.events.insert({
            calendarId: newCalendarId,
            resource: textEvent
          })
          await sleep(500)
        }
      } else {
        const handleLichthi = async () => {
          // lichThi
          const name = `${newCalendar[i]['Tên học phần']} - ${newCalendar[i]['Phòng thi']} - ${newCalendar[i]['Mã học phần']}`
          const desc = `Kỳ thi: ${newCalendar[i]['Kỳ thi']} - Phòng thi:${newCalendar[i]['Địa điểm']} ${newCalendar[i]['Phòng thi']}`
          const location = `${newCalendar[i]['Địa điểm']}`
          const date = convertExamDate(newCalendar[i]['Ngày thi'])
          const startTime = convertTime(newCalendar[i]['Giờ thi'], isLichThi)
          const endTime = convertTime(
            addTime(
              newCalendar[i]['Giờ thi'],
              newCalendar[i]['Thời gian làm bài (phút)']
            ),
            isLichThi
          )

          var textEvent = {
            summary: name,
            location: location,
            description: desc,
            start: {
              dateTime: `${date}T${startTime}+07:00`,
              timeZone: 'Asia/Ho_Chi_Minh'
            },
            end: {
              dateTime: `${date}T${endTime}+07:00`,
              timeZone: 'Asia/Ho_Chi_Minh'
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
              ]
            }
          }

          calendar.events.insert({
            calendarId: newCalendarId,
            resource: textEvent
          })
        }
        console.log('generate lich thi')
        await sleep(500).then(handleLichthi())
      }
    }
    res.send('Done!')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

module.exports = router
