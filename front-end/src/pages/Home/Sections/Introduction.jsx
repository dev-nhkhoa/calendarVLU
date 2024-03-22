import { Box, Typography } from '@mui/material'

const Introduction = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#ECECEC',
          p: '5px 10px',
          borderRadius: '16px'
        }}
      >
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          Đây là gì?
        </Typography>
        <Typography
          sx={{
            textIndent: '10px',
            textAlign: 'justify'
          }}
        >
          Xin chào! Mình là{' '}
          <Typography sx={{ color: '#731CFF', display: 'inline' }}>
            VLU CALENDAR GENERATOR
          </Typography>
          . Mình được sinh ra để giúp bạn tạo lịch từ trang{' '}
          <a
            href='https://online.vlu.edu.vn/Home/Schedules'
            target='_blank'
            rel='noreferre noreferrer'
          >
            online.vlu.edu.vn
          </a>{' '}
          sang{' '}
          <a
            href='https://calendar.google.com/calendar/u/0/r'
            target='_blank'
            rel='noreferre noreferrer'
          >
            Google Calendar
          </a>{' '}
          với mục đích là thuận tiện xem lịch học của mình. Vì mỗi lần bạn muốn
          xem lịch học của mình thì phải mất tầm 3-4p để đăng nhập, còn nếu bạn
          tự điền lịch lên Google Calendar thì sẽ tốn thời gian của bạn. Mình ở
          đây để giúp các bạn :D
        </Typography>
      </Box>
    </Box>
  )
}

export default Introduction
