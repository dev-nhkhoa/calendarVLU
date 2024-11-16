import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import NavigateIcon from '~/components/NavigateIcon'
import Warning from '~/components/Warning'

import { link } from '~/user-config.json'

const Contact = () => {
  return (
    <Container sx={{ width: '100%', height: '100vh', py: '16px' }}>
      <Container
        sx={{
          backgroundColor: '#252525',
          borderRadius: '32px',
          height: '100%',
          width: { md: '600px', xs: '100%' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '16px',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            color: '#eeeeee',
            fontSize: { md: '24px', xs: '18px' },
            fontWeight: '500'
          }}
        >
          Thông tin liên hệ
        </Typography>
        <Box sx={{ position: 'absolute', top: 0, left: 0, pt: 2 }}>
          <NavigateIcon navigateTo="/" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="small" sx={{ color: '#eeeeee' }}>
            Liên hệ qua facebook:{' '}
            <a href={link.me.facebook} target="_blanks" rel="noreferrer" style={{ color: '#61bc84' }}>
              @Nhkhoa
            </a>
          </Typography>
          <Typography variant="small" sx={{ color: '#eeeeee' }}>
            Trang web cá nhân của tôi:{' '}
            <a href={link.me.website} target="_blanks" rel="noreferrer" style={{ color: '#61bc84' }}>
              Nhkhoa.me
            </a>
          </Typography>
          <Typography variant="small" sx={{ color: '#eeeeee' }}>
            Source Code:{' '}
            <a href={link.gitHub} target="_blanks" rel="noreferrer" style={{ color: '#61bc84' }}>
              @gitHub
            </a>
          </Typography>
          <Typography variant="small" sx={{ color: '#eeeeee' }}>
            Zalo liên hệ: {link.me.zalo}
          </Typography>
        </Box>
        <Warning />
      </Container>
    </Container>
  )
}

export default Contact
