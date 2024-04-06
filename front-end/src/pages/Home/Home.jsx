import { Container } from '@mui/material'
import { colors } from '~/main'

// pages
import Login from '~/pages/Login/Login'
import Header from '~/components/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GoogleLogin from '../Google/GoogleLogin/GoogleLogin'
import ImportCalendar from '../Google/ImportCalendar/ImportCalendar'
import { useState } from 'react'
import LandingPage from '../LandingPage/LandingPage'

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
      element: <LandingPage />
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
  return <RouterProvider router={router} />
}

export default Home
