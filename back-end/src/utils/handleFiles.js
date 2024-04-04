const tabletojson = require('tabletojson').tabletojson
const fs = require('fs')
const { plus } = require('googleapis/build/src/apis/plus')
const path = require('path')
require('dotenv').config()

const fileHTML = process.env.FILE_HTML || 'file.html'
const fileJSON = process.env.FILE_JSON || 'converted.json'

const unlinkFiles = () => {
  fs.unlink(fileHTML, (err) => {})
  fs.unlink(fileJSON, (err) => {})
}

// Hàm convert HTML table -> json
// return lại table để hiển thị cho user bên FE hoặc string thông báo đăng nhập thất bại
const convertTable2JSON = (HTMLTable) => {
  const locateFile = fs.readFileSync(
    path.resolve(process.cwd(), `./${fileHTML}`),
    {
      encoding: 'utf-8'
    }
  )

  const converted = tabletojson.convert(locateFile)

  // Save file converted.json
  fs.writeFileSync(fileJSON, JSON.stringify(converted, null, 2), (err) => {
    if (err) console.error(err)
  })

  if (
    fs.readFileSync(path.resolve(process.cwd(), `./${fileJSON}`), {
      encoding: 'utf-8'
    }).length == 2
  ) {
    return 'Đăng nhập thất bại!'
  }
  return HTMLTable
}

const saveFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (err) => {
    if (err) {
      console.error(err)
      return false
    }
  })
  return true
}

const readFile = (fileName) => {
  return fs.readFileSync(path.resolve(process.cwd(), `./${fileName}`), {
    encoding: 'utf-8'
  })
}

const removeThings = (data, isLichThi) => {
  const newData = data.flat()
  // xóa tiêu đề
  if (isLichThi) newData.shift()
  return newData
}

const convertDate = (date) => {
  switch (date) {
    case 'Hai':
      return 0
    case 'Ba':
      return 1
    case 'Tư':
      return 2
    case 'Năm':
      return 3
    case 'Sáu':
      return 4
    case 'Bảy':
      return 5
    case 'Chủ Nhật':
      return 6
  }
}

function calcDate(dayOfWeek, weekNumber, isLichThi) {
  const startWeek = 30
  const startDate = new Date('2024-03-25') // Ngày bắt đầu

  // Tính số ngày cần thêm vào dựa trên sự chênh lệch giữa số tuần được truyền vào và tuần bắt đầu
  const daysToAdd = (weekNumber - startWeek) * 7

  // Sao chép ngày bắt đầu và thêm số ngày vào
  const targetDate = new Date(startDate)
  targetDate.setDate(startDate.getDate() + daysToAdd + dayOfWeek)

  const day = targetDate.getDate().toString().padStart(2, '0') // Ngày
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0') // Tháng (lưu ý: tháng trong JavaScript bắt đầu từ 0)
  const year = targetDate.getFullYear().toString() // Năm

  return `${year}-${month}-${day}` // Trả về chuỗi ngày/tháng/năm
}

const convertTime = (time, isLichThi) => {
  if (isLichThi) return time.replace('g', ':') + ':00'
  const convert2Time = (num) => {
    switch (num) {
      case 1:
        return '7:00:00'
      case 2:
        return '8:15:00'
      case 3:
        return '9:30:00'
      case 4:
        return '9:30:00'
      case 5:
        return '10:45:00'
      case 6:
        return '12:00:00'
      case 7:
        return '13:00:00'
      case 8:
        return '14:15:00'
      case 9:
        return '15:30:00'
      case 10:
        return '15:30:00'
      case 11:
        return '16:45:00'
      case 12:
        return '18:00:00'
      case 13:
        return '18:00:00'
      case 14:
        return '19:15:00'
      case 15:
        return '20:30:00'
    }
  }
  return time.split('-').map((item) => convert2Time(parseInt(item)))
}

const convertExamDate = (date) => {
  const newDate = String(date).split('/')
  return `${newDate[2]}-${newDate[1]}-${newDate[0]}`
}

function addTime(time, add) {
  if (add == '') {
    return time
  }
  const aTime = String(time).split('g')
  let plusHour = Math.floor(add / 60)
  let plusMinute = add % 60

  if (plusMinute + aTime[1] > 60) {
    plusHour += 1
    plusMinute = 60 - plusMinute
  }

  if (plusHour >= 24) {
    plusHour -= 24
  }

  const newHour = parseInt(aTime[0]) + plusHour
  const newMinute = parseInt(aTime[1]) + plusMinute

  return `${newHour}g${newMinute}`
}

module.exports = {
  convertTable2JSON,
  unlinkFiles,
  saveFile,
  readFile,
  removeThings,
  convertTime,
  calcDate,
  convertDate,
  convertExamDate,
  addTime
}
