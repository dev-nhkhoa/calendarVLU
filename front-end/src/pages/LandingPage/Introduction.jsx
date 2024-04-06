import { Box, Typography } from '@mui/material'
import LandingPageHeader from '~/components/LandingPageHeader'
import { LANG } from '~/lib/language'

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
        {LANG.introduce}
      </Typography>
    </Box>
  )
}

export default Introduction
