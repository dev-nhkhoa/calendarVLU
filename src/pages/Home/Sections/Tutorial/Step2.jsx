import { Box, Typography } from '@mui/material'
import InlineTypo from '~/components/InlineTypo'

const Step2 = () => {
  return (
    <Box
      sx={{
        textIndent: '10px',
        textAlign: 'justify'
      }}
    >
      <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
        Bước 2:
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Truy cập{' '}
        <a
          href='https://www.adobe.com/acrobat/online/pdf-to-excel.html'
          target='_blank'
          rel='noreferre noreferrer'
        >
          adobe.com/online-tools/pdf-2-excel
        </a>
      </Typography>
      <Typography sx={{ textIndent: '30px' }}>
        - Convert lịch học từ <InlineTypo name={'PDF'} /> sang{' '}
        <InlineTypo name={'EXCEL'} />.
      </Typography>
    </Box>
  )
}

export default Step2
