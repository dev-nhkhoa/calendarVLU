import { Box, Typography } from '@mui/material'

const Tutorial = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ECECEC',
        p: '5px 10px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        Hướng dẫn:
      </Typography>

      <Typography
        sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'end' }}
      >
        Done!
      </Typography>
    </Box>
  )
}

export default Tutorial
