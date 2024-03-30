import { Container } from '@mui/material'
import { colors } from '~/main'

// pages
import Login from './Login/Login'
import Header from '~/components/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Calendar from '../Calendar/Calendar'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Login />
  },
  {
    id: 'calendar-login',
    path: '/calendar-login',
    element: <Calendar />
  }
])

const Home = () => {
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
