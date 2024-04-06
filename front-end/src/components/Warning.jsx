import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Warning = () => {
  return (
    <Box>
      <Typography variant='small' sx={{ color: '#ffffff' }}>
        *Lưu ý: Các đăng nhập sẽ không lưu lại tài khoản và mật khẩu của bạn.
      </Typography>
      <Typography variant='small' sx={{ color: '#ffffff' }}>
        *Miễn trừ trách nhiệm: Có thể Thầy/Cô sẽ thay đổi thời khóa biểu vào
        buổi bất kì trong tuần. Công cụ không có khả năng cập nhật hoặc đồng bộ
        hóa các thay đổi đó.
      </Typography>
    </Box>
  )
}

export default Warning
