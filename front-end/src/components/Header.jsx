import { Box, Typography } from '@mui/material'
import { version } from '../../package.json'
import { LANG } from '~/lib/language'

export default function Header() {
  return (
    // Background
    <Box
      maxWidth={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo & name */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant='large'>Logo</Typography>
          <Typography variant='large'>CalenVLU</Typography>
        </Box>

        {/* Version */}
        <Typography variant='normal'>Version: {version}</Typography>
      </Box>

      {/* Introduction */}
      <Typography
        maxWidth={'70%'}
        variant='small'
        sx={{
          display: 'flex',
          alignSelf: 'center',
          textIndent: '12px',
          textAlign: 'justify'
        }}
      >
        {LANG.introduce}
      </Typography>
    </Box>
  )
}
