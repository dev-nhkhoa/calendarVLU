import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ImportCalendar = ({ isLichThi, setLichThi, calendar, setCalendar }) => {
  const navigate = useNavigate()
  const handleImportCalendar = () => {
    console.log(isLichThi)
    console.log(calendar)
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography>Tên lịch:</Typography>
          <input type='text' placeholder='Mặc định là Lịch VLU' />
        </Box>
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
      </form>
    </Container>
  )
}

export default ImportCalendar
