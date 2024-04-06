import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'
import { link } from '~/user-config.json'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Warning from '~/components/Warning'
import { Button } from '@mui/material'
import { downloadFile } from '~/lib/handleThings'

const CalendarButton = styled(Button)(() => ({
  height: '25px',
  borderRadius: '16px',
  color: '#252525',
  backgroundColor: '#eeeeee',
  ':hover': {
    color: '#eeeeee',
    backgroundColor: '#333333',
    fontWeight: '500'
  }
}))

const ShowCalendarFromServer = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto',
        color: '#eeeeee'
      }}
    />
  )
}

const Calendar = ({ userId, lichType }) => {
  const navigate = useNavigate()
  const [htmlCalendar, setHtmlCalendar] = useState()
  const [onLoad, setOnLoad] = useState(false)
  const [importCalendarReport, setImportCalendarReport] = useState()
  const [googleToken, setGoogleToken] = useState()

  const fileName = `${userId}-${
    lichType == 'ShowExam' ? '-lichThi' : '-lichHoc'
  }.csv`

  useEffect(() => {
    const getHtmlCalendar = async () => {
      try {
        const response = await axios.get(
          link.server.api + '/get-vlu-calendar',
          {
            params: { userId }
          }
        )
        return response.data
      } catch (error) {
        return 'Khổng thể kết nối tới server!'
      }
    }

    const fetchHtmlCalendar = async () => {
      const htmlCalendarFromServer = await getHtmlCalendar()
      setHtmlCalendar(htmlCalendarFromServer)
    }

    fetchHtmlCalendar()

    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token == undefined) return

    setGoogleToken(token)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExportCalendar = async () => {
    const getCalendarJson = await axios.get(
      link.server.api + '/export-calendar-to-csv',
      { params: { userId, lichType }, responseType: 'blob' }
    )

    downloadFile(getCalendarJson.data, fileName)
  }

  const handleLogin2Google = () => {
    window.open(`${link.server.google}/authenticate`, '_self')
  }

  const handleImportCalendar2Google = async () => {
    setOnLoad(true)
    try {
      const callApi = await axios.get(link.server.google + '/calendar', {
        params: {
          userId,
          token: googleToken,
          calendarName: lichType == 'ShowExam' ? 'Vlu Exams' : 'Vlu Learnings',
          lichType
        }
      })

      if (callApi.status != 200) {
        setImportCalendarReport('Lỗi!', callApi.data)
        setOnLoad(false)
        return
      }

      setImportCalendarReport('Done!')
      setOnLoad(false)
    } catch (error) {
      setImportCalendarReport(error.message)
      setOnLoad(false)
    }
  }

  return (
    <Container sx={{ width: '100%', height: '100vh', py: '16px' }}>
      <Container
        sx={{
          backgroundColor: '#252525',
          borderRadius: '32px',
          height: '100%',
          width: { md: '600px', xs: '100%' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '16px'
        }}>
        <Typography
          sx={{
            color: '#eeeeee',
            fontSize: { md: '24px', xs: '18px' },
            fontWeight: '500'
          }}>
          Lịch VLU
        </Typography>
        <ShowCalendarFromServer data={htmlCalendar} />

        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: '8px' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <CalendarButton
              onClick={() => {
                navigate('/vlu/login')
              }}>
              Quay lại
            </CalendarButton>
            <CalendarButton onClick={handleExportCalendar}>
              Export lịch
            </CalendarButton>
            <CalendarButton onClick={handleLogin2Google}>
              Đăng nhập Google
            </CalendarButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {onLoad ? (
              <CircularProgress />
            ) : (
              <>
                {googleToken ? (
                  <CalendarButton onClick={handleImportCalendar2Google}>
                    Import Lịch Lên Google Calendar
                  </CalendarButton>
                ) : null}
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {importCalendarReport ? (
              <Typography sx={{ color: '#eeeeee' }}>
                {importCalendarReport}
              </Typography>
            ) : null}
          </Box>
        </Box>

        <Warning />
      </Container>
    </Container>
  )
}

export default Calendar
