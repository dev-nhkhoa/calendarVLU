import { Box, Container, Typography } from '@mui/material'
import { LANG } from '~/lib/language'

const Footer = () => {
  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { md: 'center', xs: 'space-between' },
        gap: 2,
        backgroundColor: '#fff',
        border: '2px solid black',
        borderRadius: '32px',
        py: '5px'
      }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='small'>
            Phát triển và bản quyền thuộc về @Nhkhoa
          </Typography>
          <Typography variant='small'>
            Source code:{' '}
            <a href={LANG.link.gitHub} target='_blank' rel='noreferrer'>
              calenVLU
            </a>
          </Typography>

          <Typography variant='small'>
            Liên hệ dev:{' '}
            <a href={LANG.link.me} target='_blank' rel='noreferrer'>
              @Nhkhoa
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Footer
