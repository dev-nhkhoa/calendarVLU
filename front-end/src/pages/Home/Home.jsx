import { Box, Container } from '@mui/material'

import Header from './Sections/Header'
import Introduction from './Sections/Introduction'
import Tutorial from './Sections/Tutorial/Tutorial'
import TrobleshootAndQuestion from './Sections/TrobleshootAndQuestion'

const Home = () => {
  return (
    <Container
      sx={{
        width: { md: '650px', sm: '450px', xs: '350px' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '28px'
        }}
      >
        <Header />
        <Introduction />
        <Tutorial />
        <TrobleshootAndQuestion />
      </Box>
    </Container>
  )
}
export default Home
