import express from 'express'
import cors from 'cors'
import { tabletojson } from 'tabletojson'
import fs from 'fs'
import * as path from 'path'

const app = express()
const port = 3000

let cookieID = ''

const fileHTML = 'file.html'
const fileJSON = 'converted.json'

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  unlinkFILE()
  fetch('https://online.vlu.edu.vn').then((response) => {
    cookieID = response.headers.getSetCookie().toString().split(';')[0]
    res.send(`Lưu cookieID thành công!: ${cookieID}`)
  })
})

app.get('/json', (req, res) => {
  const myHeaders = new Headers()
  myHeaders.append('Cookie', cookieID)

  const formdata = new FormData()
  formdata.append('txtTaiKhoan', '2274802010428')
  formdata.append('txtMatKhau', 'khoa@vanlang@2701')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }

  const convert2JSON = () => {
    const html = fs.readFileSync(path.resolve(process.cwd(), `./${fileHTML}`), {
      encoding: 'utf-8'
    })

    const converted = tabletojson.convert(html)
    console.log(converted)

    fs.writeFile(fileJSON, JSON.stringify(converted, null, 2), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('File json đã được lưu')
      }
    })

    res.send(converted)
  }

  fetch('https://online.vlu.edu.vn/login', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      fetch(
        'https://online.vlu.edu.vn/Home/DrawingStudentSchedule_Perior?YearStudy=2023-2024&TermID=HK02',
        requestOptions
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
          convert2JSON()
        })
        .catch((error) => console.error(error))
    })
    .catch((error) => console.error(error))
})

const unlinkFILE = () => {
  fs.unlink(fileHTML, (err) => console.log('Không tìm thấy file html cũ'))
  fs.unlink(fileJSON, (err) => console.log('Không tìm thấy file json cũ'))
}
