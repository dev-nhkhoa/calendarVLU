import { Container } from '@mui/material'
import { colors } from '~/main'

// pages
import Login from '~/pages/Login/Login'
import Header from '~/components/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GoogleLogin from '../Google/GoogleLogin/GoogleLogin'
import ImportCalendar from '../Google/ImportCalendar/ImportCalendar'
import { useState } from 'react'

const Home = () => {
  const [calendar, setCalendar] = useState()
  const [isLichThi, setLichThi] = useState(false)
  const [token, setToken] = useState()

  const router = createBrowserRouter([
    {
      path: '/vlu-login',
      element: (
        <Login
          isLichThi={isLichThi}
          setLichThi={setLichThi}
          setCalendarJson={setCalendar}
          setToken={setToken}
        />
      )
    },
    {
      id: 'root',
      path: '/',
      element: <GoogleLogin />
    },
    {
      path: '/import-calendar',
      element: (
        <ImportCalendar
          calendar={calendar}
          isLichThi={isLichThi}
          setLichThi={setLichThi}
          setCalendar={setCalendar}
          token={token}
        />
      )
    }
  ])
  return (
    <Container
      maxWidth={'100%'}
      sx={{
        height: '100vh',
        backgroundColor: colors.bg,
        pt: '12px',
        pb: '12px',
        display: 'flex',
        alignItems: 'center',
        overflowY: 'auto'
      }}
    >
      <Container
        maxWidth={'sm'}
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor: colors.main,
          borderRadius: '12px',
          p: '12px 12px'
        }}
      >
        <Header />
        <RouterProvider router={router} />
      </Container>
    </Container>
  )
}

export default Home
