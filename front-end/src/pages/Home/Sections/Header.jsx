import { Box, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        p: '5px 40px',
        borderRadius: '16px',
        textAlign: 'center'
      }}
    >
      <Typography
        sx={{
          fontSize: { md: '16px', sm: '14px', xs: '12px' },
          color: '#fff',
          fontFamily: 'Inter'
        }}
      >
        VLU CALENDAR GENERATOR
      </Typography>
    </Box>
  )
}

export default Header
