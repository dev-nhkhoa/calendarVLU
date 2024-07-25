// pages
import Login from '~/pages/Login/Login'
import Calendar from '../Calendar/Calendar'
import LandingPage from '../LandingPage/LandingPage'

import React from 'react'
import Cookies from 'js-cookie'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { generateRandomUserID, saveUserIDToCookie } from '~/lib/handleThings'
import Contact from '../Contact/Contact'
import { link } from '~/user-config.json'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = React.useState(true)
  const [userId, setUserId] = React.useState(Cookies.get('userID'))
  const [isLogin2Vlu, setIsLogin2Vlu] = React.useState(false)
  const [lichType, setLichType] = React.useState(localStorage.getItem('lichType') || 'DrawingStudentSchedule_Perior')

  React.useEffect(() => {
    if (Cookies.get('userID') == undefined) {
      const userID = generateRandomUserID()
      const expirationDays = 1
      saveUserIDToCookie(userID, expirationDays)
    }
    const getUserId = Cookies.get('userID')
    setUserId(getUserId)

    async function load() {
      try {
        const req = await axios.get(link.server.api)

        if (req.status === 200) setLoading(false)
      } catch (error) {
        alert('Không thể kết nối với server')
      }
    }
    load()
  }, [])

  const router = createBrowserRouter([
    {
      path: '/vlu/login',
      element: <Login userId={userId} setIsLogin2Vlu={setIsLogin2Vlu} lichType={lichType} setLichType={setLichType} />
    },
    {
      id: 'root',
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/vlu/calendar',
      element: <Calendar isLogin2Vlu={isLogin2Vlu} userId={userId} lichType={lichType} />
    },
    {
      path: '/contact',
      element: <Contact />
    }
  ])
  return loading ? <div>Đang kết nối với SERVER...</div> : <RouterProvider router={router} />
}

export default Home
