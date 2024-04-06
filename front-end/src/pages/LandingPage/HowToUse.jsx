import { Box, Typography } from '@mui/material'
import LandingPageHeader from '~/components/LandingPageHeader'

const HowToUse = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <LandingPageHeader name='Cách Sử Dụng:' />
      <Typography
        style={{
          fontSize: '16px',
          fontWeight: '100',
          color: '#fff',
          cursor: 'pointer',
          textAlign: 'justify'
        }}>
        <Box sx={{ pl: '32px' }}>
          <ol>
            <li>
              Nhấn vào <a href='/login-to-vlu'>đây</a> để đăng nhập vào tài
              khoản trang online.vlu.edu.vn.
            </li>
            <li>
              Sau khi đăng nhập và xem được thông tin lịch, bạn có thể xuất lịch
              dưới dạng file .csv, file này sẽ dùng để bạn import thủ công lịch
              lên trang Google Calendar.
              <p
                style={{
                  textDecoration: 'underline',
                  fontWeight: '500',
                  color: '#4r4r4r4',
                  fontSize: '18px'
                }}>
                Import lịch thủ công lên Google Calendar:
              </p>
              <p
                style={{
                  fontWeight: '300',
                  color: '#4r4r4r4',
                  fontSize: '14px'
                }}>
                Lưu ý: Hãy đảm bảo rằng bạn đã đăng nhập tài khoản Google từ
                trước. Đọc hướng dẫn và nhấn vào các link được tô bên dưới để
                thực hiện.
              </p>
              <Box sx={{ pl: '24px' }}>
                <ol>
                  <li>Export lịch dạng file .csv</li>
                  <li>
                    Truy cập vào{' '}
                    <a
                      href='https://calendar.google.com/calendar/u/0/r/settings/createcalendar'
                      target='_blank'
                      rel='noreferrer'>
                      Google Calendar
                    </a>{' '}
                    để tạo lịch mới
                  </li>
                  <li>
                    Tiếp tục nhấn vào{' '}
                    <a
                      href='https://calendar.google.com/calendar/u/0/r/settings/export'
                      target='_blank'
                      rel='noreferrer'>
                      đây
                    </a>{' '}
                    để import file .csv vừa tải lên Google Calendar. Chọn file
                    .csv đã tải về máy và nhấn Import.
                  </li>
                  <li>Done.</li>
                </ol>
              </Box>
            </li>
            <li>Chưa cập nhật...</li>
          </ol>
        </Box>
      </Typography>
    </Box>
  )
}

export default HowToUse
