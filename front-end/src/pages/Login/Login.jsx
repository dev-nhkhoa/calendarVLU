import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { createHKARRAY, createYearARRAY } from '~/lib/utils'
import Error from '../Error'

const CalenTABLE = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      style={{
        px: '-10px',
        maxHeight: '300px',
        width: '300px',
        overflow: 'auto'
      }}
    />
  )
}

const Login = ({ cookie }) => {
  const [json, setJSON] = React.useState('')
  const [isSvOK, setIsOK] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(false)

  const handleExportCSV = async () => {
    const responce = await fetch('http://localhost:3000/json')
    const calendar = await JSON.parse(responce.text())
  }

  const handleLogin = async () => {
    const user = document.getElementById('txtTaiKhoan').value
    const pass = document.getElementById('txtMatKhau').value
    const dropdownYear = document.getElementById('dropdown-year')
    const year = dropdownYear.options[dropdownYear.selectedIndex].value

    const dropdownHK = document.getElementById('dropdown-hk')
    const hk = dropdownHK.options[dropdownHK.selectedIndex].value

    try {
      const userFetch = await fetch('http://localhost:3000/table', {
        method: 'GET',
        headers: {
          cookievlu: cookie,
          txtTaiKhoan: user,
          txtMatKhau: pass,
          year: year,
          hk: hk
        }
      })

      const data = await userFetch.text()
      setJSON(data)
      if (data !== 'Đăng nhập thất bại!') {
        setIsLogin(true)
      }
    } catch (error) {
      alert('Gửi yêu cầu thất bại đến máy chủ!', error)
      setIsOK(false)
    }
  }

  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: '16px',
        textAlign: 'center',
        justifyContent: 'center',
        width: '300px'
      }}
    >
      <Container
        disableGutters
        sx={{ display: 'flex', flexDirection: 'column', p: '0px 10px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography>Đăng Nhập</Typography>
          {/* Tài khoản */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '100%',
              alignItems: 'center'
            }}
          >
            <h4>username:</h4>
            <input
              id='txtTaiKhoan'
              type='text'
              placeholder='tài khoản trang online'
              style={{ width: '100%', height: '20px' }}
            />
          </Box>
          {/* Mật khẩu */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '100%',
              alignItems: 'center'
            }}
          >
            <h4>password:</h4>
            <input
              id='txtMatKhau'
              type='password'
              placeholder='mật khẩu trang online'
              style={{ width: '100%', height: '20px' }}
            />
          </Box>
          {/* Chọn năm học & học kì*/}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Chọn năm học */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <p>Năm học:</p>
              <select id='dropdown-year' style={{ height: '20px' }}>
                {createYearARRAY().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </Box>
            {/* Chọn học kì */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <p>Học kì:</p>
              <select id='dropdown-hk' style={{ height: '20px' }}>
                {createHKARRAY().map((hk) => (
                  <option key={hk} value={hk}>
                    {hk}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
          <Button variant='contained' onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Box>
      </Container>
      <Container
        disableGutters
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {isSvOK ? <CalenTABLE data={json} /> : <Error />}
        {isLogin ? (
          <p>Vui lòng reload lại page để đăng nhập tài khoản khác</p>
        ) : null}
        {isLogin ? (
          <Button variant='contained' onClick={handleExportCSV}>
            Export file .csv
          </Button>
        ) : null}
        {isLogin ? (
          <Button variant='contained' onClick={() => {}}>
            Lấy link .ical
          </Button>
        ) : null}
      </Container>
    </Container>
  )
}

export default Login
