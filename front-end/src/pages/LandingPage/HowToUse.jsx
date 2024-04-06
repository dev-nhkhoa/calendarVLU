import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
        }}></Typography>
    </Box>
  )
}

export default HowToUse
