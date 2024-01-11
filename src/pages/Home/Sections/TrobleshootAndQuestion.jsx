import { Box, Typography } from '@mui/material'

const TrobleshootAndQuestion = () => {
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
          troubleshoots & Questions:
        </Typography>
        <Typography sx={{ textIndent: '10px' }}>
          * Website này mình code theo output excel của tool Acrobat nên nếu bạn
          sử dụng phần mền chuyển đổi file khác từ pdf sang excel thì có thể sẽ
          không sử dụng dược.
        </Typography>
        <Typography sx={{ textIndent: '10px' }}>
          * Mình chỉ mới test trên một số file lịch học của bạn mình nên còn
          nhiều thiếu sót, có thể sẽ không hoạt động theo file lịch học của bạn.
        </Typography>
        <Typography sx={{ textIndent: '10px' }}>
          * Chỉ hoạt động được trên lịch của Năm Học: 2023-2024 Học Kì: 02. Học
          kì khác sẽ không hoạt động!
        </Typography>
        <Typography sx={{ textIndent: '10px', pt: '20px', fontWeight: 'bold' }}>
          * Nếu bạn gặp vấn đề về việc sử dụng hãy liên hệ mình để được hỗ trợ
          nhé:{' '}
          <a
            href='https://www.facebook.com/nhkhoa.a/'
            target='_blank'
            rel='noreferre noreferrer'
          >
            Facebook mình
          </a>
        </Typography>
      </Box>
    </Box>
  )
}

export default TrobleshootAndQuestion
