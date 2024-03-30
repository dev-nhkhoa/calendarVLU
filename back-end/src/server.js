import express from 'express'
import cors from 'cors'
import { tabletojson } from 'tabletojson'
import fs from 'fs'
import * as path from 'path'

const app = express()
const port = 3000

const fileHTML = 'file.html'
const fileJSON = 'converted.json'

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/get-cookie', (req, res) => {
  unlinkFILE()
  fetch('https://online.vlu.edu.vn').then((response) => {
    res.send(response.headers.getSetCookie().toString().split(';')[0])
  })
})

app.get('/get-calendar', (req, res) => {
  const myHeaders = new Headers()
  const cookie = req.headers['cookievlu']
  const user = req.headers['txttaikhoan']
  const pass = req.headers['txtmatkhau']
  const year = req.headers['year']
  const hk = req.headers['hk']
  const lich = req.headers['lich']
  myHeaders.append('Cookie', cookie)

  const formdata = new FormData()
  formdata.append('txtTaiKhoan', user)
  formdata.append('txtMatKhau', pass)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }

  const convert2JSON = (result) => {
    const html = fs.readFileSync(path.resolve(process.cwd(), `./${fileHTML}`), {
      encoding: 'utf-8'
    })

    const converted = tabletojson.convert(html)

    fs.writeFileSync(fileJSON, JSON.stringify(converted, null, 2), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('File json đã được lưu')
      }
    })

    fs.readFileSync(path.resolve(process.cwd(), `./${fileJSON}`), {
      encoding: 'utf-8'
    }).length == 2
      ? res.send('Đăng nhập thất bại!')
      : res.send(result)
  }

  fetch('https://online.vlu.edu.vn/login', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const requestOptions2 = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      fetch(
        `https://online.vlu.edu.vn/Home/${lich}?YearStudy=${year}&TermID=${hk}`,
        requestOptions2
      )
        .then((response) => response.text())
        .then((result) => {
          fs.writeFileSync(fileHTML, result, (err) => {
            if (err) {
              console.error(err)
              res.status(500).send('Lỗi khi lưu file')
            } else {
              console.log('File html đã được lưu')
            }
          })
          convert2JSON(result)
        })
        .catch((error) => console.error(error))
    })
    .catch((error) => console.error(error))
})

app.get('/get-calendar-json', (req, res) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), `./${fileJSON}`), {
    encoding: 'utf-8'
  })
  res.send(data)
})

const unlinkFILE = () => {
  fs.unlink(fileHTML, (err) => console.log('Không tìm thấy file html cũ'))
  fs.unlink(fileJSON, (err) => console.log('Không tìm thấy file json cũ'))
}
