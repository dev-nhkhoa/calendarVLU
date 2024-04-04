import { Container } from '@mui/material'
import GoogleLoginBtn from '~/components/GoogleLoginBtn'

const GoogleLogin = () => {
  return (
    <Container
      disableGutters
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <>
        <GoogleLoginBtn />
      </>
    </Container>
  )
}

export default GoogleLogin
