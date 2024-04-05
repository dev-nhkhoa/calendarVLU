import { Button, CircularProgress, Container } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANG } from '~/lib/language'

const ImportCalendar = ({
  isLichThi,
  setLichThi,
  calendar,
  setCalendar,
  token
}) => {
  const [onLoad, setOnLoad] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const calendarName = isLichThi ? 'VLU Exams' : 'VLU Learning'
  const handleImportCalendar = async () => {
    // setOnLoad(true)
    const getCalendarList = await fetch(`${LANG.link}/google/calendar`, {
      headers: {
        'vlu-calendarname': calendarName,
        'vlu-token': token,
        'vlu-islichthi': isLichThi
      }
    })
    const response = await getCalendarList.json()
    const status = response.code
    if (status == 403) {
      setOnLoad(false)
      setError(response.errors['0'].message)
    }
  }
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!onLoad ? (
          error != undefined ? (
            <p>{error}</p>
          ) : (
            <>
              <Button
                variant='contained'
                style={{ width: '100%' }}
                onClick={handleImportCalendar}
              >
                Import lịch lên Google Calendar
              </Button>

              <Button
                variant='contained'
                style={{ width: '100%' }}
                onClick={() => {
                  setCalendar()
                  setLichThi(false)
                  navigate('/vlu-login')
                }}
              >
                Quay lại
              </Button>
            </>
          )
        ) : (
          <CircularProgress />
        )}
      </form>
    </Container>
  )
}

export default ImportCalendar
