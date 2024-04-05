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
const { sleep } = require('../utils/usefulThings')

// google cloud credentials
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

const handleGoogleAuthenticate = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar',
    include_granted_scopes: true
  })

  res.redirect(url)
}

const handleGoogleGetAccessToken = (req, res) => {
  const code = req.query.code
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.log(err)
      res.redirect(`${redirectClient}/calendar`)
      return
    }
    oauth2Client.setCredentials(token)
    //TODO: CHANGE
    res.redirect(
      `${redirectClient}/on-import-data-to-ggcalendar?token=${token.access_token}`
    )
  })
}

const handleImportDataToGoogleCalendar = async (req, res) => {
  const { userId, token, calendarName, lichType } = req.query

  const isLichThi = (lichType = 'true' ? true : false)
  const calendarJson = await JSON.parse(readFile(userId + '.json'))

  // authenticate via access token
  oauth2Client.setCredentials({ access_token: token })
  const googleCalendar = google.calendar({
    version: 'v3',
    auth: oauth2Client
  })

  // Gửi yêu cầu tạo lịch mới
  const createNewCalendar = await createNewGoogleCalendar(calendarName)
  const newCalendarId = createNewCalendar.data.id
  const calendarData = removeThings(calendarJson, isLichThi)

  const createNewGoogleCalendar = async (name) => {
    return await googleCalendar.calendars.insert({
      auth: oauth2Client,
      requestBody: {
        summary: name,
        timeZone: '+07:00'
      }
    })
  }

  const getTextEvent = (name, desc, location, date, time) => {
    return {
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
  }

  const handleImportLichHoc2GoogleCalendar = (subject) => {
    const name = `${subject['Tên học phần']} - ${subject['Phòng']}`
    const desc = `Giảng viên: ${subject['CBGD']} - Số tín chỉ: ${subject['STC']}`
    const location = `${subject['Phòng']}`
    const time = convertTime(subject['Tiết'])
    const dayOfWeek = convertDate(subject['Thứ'])
    const weekList = subject['Tuần'].split(',')
    for (let k = 0; k < weekList.length; k++) {
      const date = calcDate(dayOfWeek, weekList[k])

      calendar.events.insert({
        calendarId: newCalendarId,
        resource: getTextEvent(name, desc, location, date, time)
      })
    }
  }

  const handleImportLichThi2GoogleCalendar = () => {
    const name = `${subject['Tên học phần']} - ${subject['Phòng thi']} - ${subject['Mã học phần']}`
    const desc = `Kỳ thi: ${subject['Kỳ thi']} - Phòng thi:${subject['Địa điểm']} ${subject['Phòng thi']}`
    const location = `${subject['Địa điểm']}`
    const date = convertExamDate(subject['Ngày thi'])
    const startTime = convertTime(subject['Giờ thi'], isLichThi)
    const endTime = convertTime(
      addTime(subject['Giờ thi'], subject['Thời gian làm bài (phút)']),
      isLichThi
    )
    const time = [startTime, endTime]

    calendar.events.insert({
      calendarId: newCalendarId,
      resource: getTextEvent(name, desc, location, date, time)
    })
  }

  try {
    for (let i = 0; i < calendarData.length; i++) {
      const subject = calendarData[i]

      if (!isLichThi) {
        await sleep(1000).then(handleImportLichHoc2GoogleCalendar(subject))
        return
      }
      await sleep(1000).then(handleImportLichThi2GoogleCalendar(subject))
    }
    res.status(200).json('ok!')
  } catch (error) {
    console.log(error)
    res.status(505).json(error)
  }
}

router.get('/authenticate', handleGoogleAuthenticate)
router.get('/get-token', handleGoogleGetAccessToken)
router.get('/calendar', handleImportDataToGoogleCalendar)

module.exports = router
