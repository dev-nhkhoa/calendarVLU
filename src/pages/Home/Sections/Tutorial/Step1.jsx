import { Box, Typography } from '@mui/material'
import InlineTypo from '~/components/InlineTypo'

const Step1 = () => {
  return (
    <Box
      sx={{
        textIndent: '10px',
        textAlign: 'justify'
      }}
    >
      <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
        Bước 1:
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Đăng nhập trang{' '}
        <a href='https://online.vlu.edu.vn/Login'>online.vlu.edu.vn</a>.
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Tải lịch học dưới dạng <InlineTypo name={'PDF'} />.
      </Typography>
      {/* Hướng dẫn tải file .pdf */}
      <Typography sx={{ textIndent: '60px' }}>
        + <InlineTypo name={'"Lịch học"'} /> {' ➜ '}
        <InlineTypo name={'"TKB/Tiết"'} />
        {' ➜ '} <InlineTypo name={'"In TKB"'} />
        {' ➜ Chọn'} <InlineTypo name={'"Save as PDF"'} />.
      </Typography>
    </Box>
  )
}

export default Step1
