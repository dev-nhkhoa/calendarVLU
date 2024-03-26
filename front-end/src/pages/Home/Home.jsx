import { Box, Container, Typography } from '@mui/material'

import Header from './Sections/Header'
import Introduction from './Sections/Introduction'
import TrobleshootAndQuestion from './Sections/TrobleshootAndQuestion'
import Login from '../Login/Login'
import React from 'react'
import Error from '../Error'
import Tutorial from './Sections/Tutorial/Tutorial'

const Home = () => {
  const [isSvOK, setIsSvOK] = React.useState(true)
  const [cookie, setCookie] = React.useState('')

  React.useEffect(() => {
    const checkConnect = async () => {
      try {
        const connect = await fetch('http://localhost:3000')
        const getCookie = await connect.text()
        setCookie(getCookie)
      } catch (error) {
        setIsSvOK(false)
        alert('SV hiện không hoạt động! Vui lòng liên hệ DEV', error)
      }
    }
    checkConnect()
  }, [])

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
        {isSvOK ? <Login cookie={cookie} /> : <Error />}
        {/* TODO: ADD  */}
        {/* <Tutorial /> */}
        <TrobleshootAndQuestion />
      </Box>
    </Container>
  )
}
export default Home
