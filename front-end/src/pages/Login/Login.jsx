import axios from 'axios'

// pages
import Warning from '~/components/Warning'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { link } from '~/user-config.json'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { createDropdownTermID, createDropdownYear } from '~/lib/handleThings'
import NavigateIcon from '~/components/NavigateIcon'

const CSS_LOGIN_INPUT = {
  borderRadius: '6px',
  height: '30px',
  border: '2px solid black',
  width: '100%'
}
const CSS_LOGIN_TEXT = { color: '#eeeeee', fontWeight: '300' }

export default function Login({
  userId,
  setIsLogin2Vlu,
  lichType,
  setLichType
}) {
  // state Login
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [password, setPassword] = useState(localStorage.getItem('password'))
  const [yearStudy, setYearStudy] = useState(
    localStorage.getItem('yearStudy') || createDropdownYear()[0]
  )
  const [termID, setTermID] = useState(
    localStorage.getItem('termID') || createDropdownTermID()[0]
  )
  const [onLoad, setonLoad] = useState(false)
  const [error, setError] = useState()

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setonLoad(true)
      setError()

      const getVluLoginCookie = await axios.get(
        link.server.api + '/get-vlu-cookie'
      )
      const vluLoginResquestStatus = getVluLoginCookie.status

      if (!vluLoginResquestStatus == 200) {
        setError('Không thể lấy login cookie từ online.vlu.edu.vn!')
        setonLoad(false)
        return
      }

      const cookie = getVluLoginCookie.data

      const login2Vlu = await axios.get(link.server.api + '/login-to-vlu', {
        params: {
          userId,
          cookie,
          username,
          password,
          lichType,
          yearStudy,
          termID
        }
      })

      // login thất bại!
      if (login2Vlu.status == 507) {
        setError('Tài khoản hoặc mật khẩu không đúng!')
        setonLoad(false)
      }

      if (!login2Vlu.status == 200) {
        setError(login2Vlu.data)
        setonLoad(false)
        return
      }

      // login thành công -> redirect sang trang xem lịch

      // lưu trữ state states
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      localStorage.setItem('lichType', lichType)
      localStorage.setItem('yearStudy', yearStudy)
      localStorage.setItem('termID', termID)
      setIsLogin2Vlu(true)
      navigate('/vlu/calendar')

      setonLoad(false)
    } catch (error) {
      setError('Lỗi đăng nhập!' + error.message)
      setonLoad(false)
    }
  }

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
        }}>
        <Typography
          sx={{
            color: '#eeeeee',
            fontSize: { md: '24px', xs: '18px' },
            fontWeight: '500'
          }}>
          Đăng nhập tài khoản VLU của bạn
        </Typography>
        <Box sx={{ position: 'absolute', top: 0, left: 0, pt: 2 }}>
          <NavigateIcon navigateTo='/' />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}>
          <Box>
            <Typography sx={CSS_LOGIN_TEXT}>Số tài khoản:</Typography>
            <input
              defaultValue={username}
              type='text'
              placeholder='mã số sinh viên'
              style={CSS_LOGIN_INPUT}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box>
            <Typography sx={CSS_LOGIN_TEXT}>Mật khẩu:</Typography>
            <input
              defaultValue={password}
              type='password'
              placeholder='(vd: 12022003)'
              style={CSS_LOGIN_INPUT}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Typography sx={CSS_LOGIN_TEXT}>Chọn loại lịch:</Typography>
          <select
            defaultValue={lichType}
            name='selectLichHoc'
            style={CSS_LOGIN_INPUT}
            onChange={(e) => setLichType(e.target.value)}>
            <option value={'DrawingStudentSchedule_Perior'}>Lịch học</option>
            <option value={'ShowExam'}>Lịch thi</option>
          </select>

          <Typography sx={CSS_LOGIN_TEXT}>Chọn hăm học:</Typography>
          <select
            defaultValue={yearStudy}
            name='selectYear'
            style={CSS_LOGIN_INPUT}
            onChange={(e) => setYearStudy(e.target.value)}>
            {createDropdownYear().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Typography sx={CSS_LOGIN_TEXT}>Chọn học kì:</Typography>
          <select
            defaultValue={termID}
            name='selectPeriod'
            style={CSS_LOGIN_INPUT}
            onChange={(e) => setTermID(e.target.value)}>
            {createDropdownTermID().map((hk) => (
              <option key={hk} value={hk}>
                {hk}
              </option>
            ))}
          </select>
          {error ? (
            <Typography variant='small' sx={{ color: 'red' }}>
              {error}
            </Typography>
          ) : null}
          {!onLoad ? (
            <>
              <Button
                variant='contained'
                sx={{
                  mt: '16px',
                  color: '#252525',
                  backgroundColor: '#eeeeee',
                  ':hover': {
                    backgroundColor: '#333333',
                    color: '#f5f5f5'
                  }
                }}
                onClick={handleLogin}>
                Đăng nhập
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: '5px' }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Warning />
      </Container>
    </Container>
  )
}
