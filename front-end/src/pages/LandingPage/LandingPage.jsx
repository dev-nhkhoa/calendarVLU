import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import NavBar from '~/components/NavBar/NavBar'
import Introduction from './Introduction'
import HowToUse from './HowToUse'
import Features from './Features'
import Footer from '~/components/Footer/Footer'

const LandingPage = () => {
  return (
    <Container sx={{ paddingY: '8px', height: '100vh' }}>
      <Container
        sx={{
          width: { md: '600px', sm: '100%' },
          height: '100%',
          background: '#252525',
          borderRadius: '16px',
          paddingY: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: '16px',
            px: '8px',
            width: '100%',
            gap: 2
          }}>
          <Introduction />
          <HowToUse />
          <Features />
        </Box>
        <Footer />
      </Container>
    </Container>
  )
}

export default LandingPage
