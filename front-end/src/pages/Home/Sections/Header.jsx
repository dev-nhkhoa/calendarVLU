import { Box, Typography } from '@mui/material'
import { version } from '../../../../package.json'

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
        calenVLU - V{version}
      </Typography>
    </Box>
  )
}

export default Header
