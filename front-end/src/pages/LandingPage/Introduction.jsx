import { introduce } from '~/user-config.json'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LandingPageHeader from '~/components/LandingPageHeader'

const Introduction = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <LandingPageHeader name='Giới Thiệu:' />
      <Typography
        style={{
          fontSize: '16px',
          fontWeight: '100',
          textIndent: '16px',
          color: '#fff',
          cursor: 'pointer',
          textAlign: 'justify'
        }}>
        {introduce}
      </Typography>
    </Box>
  )
}

export default Introduction
