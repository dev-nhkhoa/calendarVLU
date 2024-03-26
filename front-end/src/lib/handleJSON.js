import { addTime, convert24to12 } from './utils'

/* eslint-disable indent */
const header = [
  'Subject',
  'Start Date',
  'Start Time',
  'End Date',
  'End Time',
  'All Day Event',
  'Description',
  'Location',
  'Private \n'
]

export function downloadFile(content, filename) {
  const element = document.createElement('a')
  const file = new Blob([content], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
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

function calcDate(dayOfWeek, weekNumber) {
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

  return `${month}/${day}/${year}` // Trả về chuỗi ngày/tháng/năm
}

const convertTime = (time) => {
  const convert2Time = (num) => {
    switch (num) {
      case 1:
        return '7:00 AM'
      case 2:
        return '8:15 AM'
      case 3:
        return '9:30 AM'
      case 4:
        return '9:30 AM'
      case 5:
        return '10:45 AM'
      case 6:
        return '12:00 PM'
      case 7:
        return '1:00 PM'
      case 8:
        return '2:15 pM'
      case 9:
        return '3:30 PM'
      case 10:
        return '3:30 PM'
      case 11:
        return '4:45 PM'
      case 12:
        return '6:00 PM'
      case 13:
        return '6:00 PM'
      case 14:
        return '7:15 PM'
      case 15:
        return '8:30 PM'
    }
  }
  return time.split('-').map((item) => convert2Time(parseInt(item)))
}

export const setupLichHoc = (data) => {
  const newData = removeLichHocThings(data)

  downloadFile(generateLichHocCSV(newData), 'lich-hoc.csv')
}

const removeLichHocThings = (data) => {
  const newData = data.flat()
  // xóa tiêu đề
  newData.shift()

  newData.map((element) => {
    delete element['Mã lớp học phần']
    delete element['STT']
    delete element['Mã lớp']
    delete element['Ghi chú']
    delete element['STC']
  })
  return newData
}

const generateLichHocCSV = (data) => {
  let result = ''
  let rows = ''
  // Add 1 dòng của header cho đúng format file import
  result += header.join(', ')

  // lặp tất cả phần tử trong data
  for (let i = 0; i < data.length; i++) {
    // lặp tất cả các tuần trong từng môn học
    const weekToARRAY = data[i]['Tuần'].split(',')

    for (let k = 0; k < weekToARRAY.length; k++) {
      const startNEndDAY = calcDate(convertDate(data[i]['Thứ']), weekToARRAY[k])
      const time = convertTime(data[i]['Tiết'])
      const startTIME = time[0]
      const endTIME = time[1]

      rows += `${data[i]['Tên học phần']}, ${startNEndDAY}, ${startTIME}, ${startNEndDAY}, ${endTIME}, FALSE, ${data[i]['CBGD']}, ${data[i]['Phòng']}, TRUE \n`
      result += rows
      rows = ''
    }
  }

  return result
}

export const setupLichThi = (data) => {
  const newData = removeLichThiThings(data)

  downloadFile(generateLichThiCSV(newData), 'lich-thi.csv')
}

const removeLichThiThings = (data) => {
  const newData = data.flat()

  newData.map((element) => {
    delete element['Mã lớp học phần']
    delete element['STT']
    delete element['SBD']
    delete element['Ghi chú']
    delete element['STC']
  })
  return newData
}

const generateLichThiCSV = (data) => {
  let result = ''
  let rows = ''
  // Add 1 dòng của header cho đúng format file import
  result += header.join(', ')

  // lặp tất cả phần tử trong data
  for (let i = 0; i < data.length; i++) {
    const name = `${data[i]['Kỳ thi']} - ${data[i]['Tên học phần']}`
    const startNEndDAY = data[i]['Ngày thi']
    const startTime = convert24to12(data[i]['Giờ thi'])
    const endTime = convert24to12(
      addTime(data[i]['Giờ thi'], data[i]['Thời gian làm bài (phút)'])
    )
    const desc = `${data[i]['Lần thi']} - ${data[i]['Hình thức thi']} - ${data[i]['Mã học phần']}`
    const location = `${data[i]['Địa điểm']} - ${data[i]['Phòng thi']}`

    rows += `${name},${startNEndDAY} ,${startTime}, ${startNEndDAY}, ${endTime}, FALSE, ${desc}, ${location}, TRUE \n`
    result += rows
    rows = ''
  }

  return result
}
