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
      </Box>
    </Box>
  )
}

export default TrobleshootAndQuestion
