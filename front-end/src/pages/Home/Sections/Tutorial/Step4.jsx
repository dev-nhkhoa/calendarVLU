import { Box, Typography } from '@mui/material'
import InlineTypo from '~/components/InlineTypo'

const Step4 = () => {
  return (
    <Box
      sx={{
        textIndent: '10px',
        textAlign: 'justify'
      }}
    >
      <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
        Bước 4:
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Truy cập trang settings{' '}
        <a href='https://calendar.google.com/calendar/u/0/r/settings'>
          Google Calendar
        </a>
        .
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Import file <InlineTypo name={'"output.csv"'} />:
      </Typography>
      <Typography sx={{ textIndent: '60px' }}>
        + <InlineTypo name={'"Add calendar"'} /> {' ➜ '}
        <InlineTypo name={'"Create new calendar"'} />
      </Typography>
      <Typography sx={{ textIndent: '60px', textAlign: 'right' }}>
        + <InlineTypo name={'"Import & Export"'} /> {' ➜ '}
        <InlineTypo name={'"Import"'} /> {' ➜ Chọn file '}
        <InlineTypo name={'"output.csv"'} /> {' ➜ Chọn lịch vừa tạo mới '}
        {' ➜ Nhấn '}
        <InlineTypo name={'"Import"'} />.
      </Typography>
    </Box>
  )
}

export default Step4
