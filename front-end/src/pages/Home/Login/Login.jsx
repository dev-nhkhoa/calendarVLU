import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { setupLichHoc, setupLichThi } from '~/lib/handleJSON'
import { LANG } from '~/lib/language'
import { createHKARRAY, createYearARRAY } from '~/lib/utils'

const CalendarHTML = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      style={{
        maxWidth: '300px',
        maxHeight: '300px',
        overflow: 'auto'
      }}
    />
  )
}

export default function Login() {
  const [onLoad, setOnLoad] = useState(false)
  const [calendar, setCalendar] = useState()
  const [isLichTHI, setIsLichTHI] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setOnLoad(true)

    const username = event.target.elements.username.value
    const password = event.target.elements.password.value
    const lichHoc = event.target.elements.selectLichHoc.value
    const year = event.target.elements.selectYear.value
    const period = event.target.elements.selectPeriod.value

    if (lichHoc == 'ShowExam') {
      setIsLichTHI(true)
    }

    try {
      // lấy cookie từ trang web online.vlu.edu.vn dùng để đăng nhập
      const getCookie = await axios.get(`${LANG.link}/get-cookie`)
      const cookie = await getCookie.data

      // thực hiện đăng nhập bằng cách dùng cookie đã lấy
      const getCalendar = await fetch(`${LANG.link}/get-calendar`, {
        method: 'GET',
        headers: {
          cookievlu: cookie,
          txtTaiKhoan: '2274802010428',
          txtMatKhau: 'khoa@vanlang@2701',
          year: year,
          hk: period,
          lich: lichHoc
        }
      })

      const calendar = await getCalendar.text()
      setOnLoad(false)
      setCalendar(calendar)
    } catch (error) {
      setOnLoad(false)
      setCalendar('Đăng nhập thất bại!')
    }
  }

  const handleExportCSV = async () => {
    const responce = await fetch(`${LANG.link}/get-calendar-json`)
    const calendar = await responce.text()
    const calendarJSON = await JSON.parse(calendar)
    if (isLichTHI) {
      //  xử lý tải lịch thi
      setupLichThi(calendarJSON)
      return
    }
    // xử lý tải lịch học
    setupLichHoc(calendarJSON)
  }

  return (
    <Box>
      {/* Tiêu đề */}
      <Typography variant='large' sx={{ textAlign: 'center' }}>
        ĐĂNG NHẬP
      </Typography>

      <Typography variant='small' sx={{ textAlign: 'center' }}>
        Đăng nhập vào tài khoảng trang online.vlu.edu.vn
      </Typography>

      <Box
        maxWidth={'md'}
        sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}
      >
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
          {/* username */}
          <Typography variant='small'>Mã đăng nhập:</Typography>
          <input type='text' name='username' />

          {/* password */}
          <Typography variant='small'>Mật khẩu:</Typography>
          <input type='password' name='password' />

          <Typography variant='small'>Lịch:</Typography>
          <select name='selectLichHoc' style={{ height: '20px' }}>
            <option value={'DrawingStudentSchedule_Perior'}>Lịch học</option>
            <option value={'ShowExam'}>Lịch thi</option>
          </select>

          <Typography variant='small'>Chọn năm học:</Typography>
          <select name='selectYear' style={{ height: '20px' }}>
            {createYearARRAY().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Typography variant='small'>Chọn học kì:</Typography>
          <select name='selectPeriod' style={{ height: '20px' }}>
            {createHKARRAY().map((hk) => (
              <option key={hk} value={hk}>
                {hk}
              </option>
            ))}
          </select>

          {onLoad ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '12px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <button type='submit' style={{ marginTop: '10px' }}>
              Lấy thời khóa biểu
            </button>
          )}
        </form>
      </Box>
      {calendar == undefined ? null : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '200px',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '12px'
          }}
        >
          <CalendarHTML data={calendar} />
          {calendar !== 'Đăng nhập thất bại!' ? (
            <>
              <button>Kết nối TKB với Google Calendar</button>
              <button onClick={handleExportCSV}>
                Xuất file thời khóa biểu
              </button>
            </>
          ) : null}
        </Box>
      )}
    </Box>
  )
}
