const { readFile, writeFile } = require('./handleFiles')

const CSV_HEADER = [
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

const removeThings = (data, isLichThi) => {
  const newData = data.flat()
  // xóa tiêu đề
  if (!isLichThi) {
    newData.shift()
  }
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
  if (isLichThi) return String(time).replace('g', ':') + ':00'
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
  // Chuyển đổi chuỗi thời gian thành giờ và phút
  const [hour, minute] = time.split('g').map(Number)

  let totalHour = hour
  let totalMinute = minute + add

  // Xử lý trường hợp khi phút vượt quá 60
  if (totalMinute >= 60) {
    totalHour += Math.floor(totalMinute / 60)
    totalMinute %= 60
  }

  // Xử lý trường hợp khi giờ vượt quá 24
  if (totalHour >= 24) {
    totalHour %= 24
  }

  // Định dạng chuỗi kết quả
  const result = `${totalHour}g${totalMinute}`

  return result
}

const convertJson4LichThiCsv = (fileName) => {
  const json2Array = removeThings(JSON.parse(readFile(fileName)), true)

  function convert24to12(time) {
    const newTime = String(time).split('g')
    let [hours, minutes] = newTime
    let part = hours >= 12 ? 'PM' : 'AM'

    // convert hours from 24-hour format to 12-hour format
    hours = hours % 12
    // 12:00 PM and 12:00 AM are special cases
    hours = hours ? hours : 12

    return hours + ':' + minutes + ' ' + part
  }

  let lichThiData = ''
  let rows = ''
  // Add 1 dòng của header cho đúng format file import
  lichThiData += CSV_HEADER.join(', ')

  // lặp tất cả phần tử trong lịch học
  for (let i = 0; i < json2Array.length; i++) {
    const subject = json2Array[i]
    const name = `${subject['Kỳ thi']} - ${subject['Tên học phần']}`
    const dateExam = subject['Ngày thi']
    const startTime = convert24to12(subject['Giờ thi'])
    const endTime = convert24to12(
      addTime(subject['Giờ thi'], subject['Thời gian làm bài (phút)'])
    )
    const desc = `${subject['Lần thi']} - ${subject['Hình thức thi']} - ${subject['Mã học phần']}`
    const location = `${subject['Địa điểm']} - ${subject['Phòng thi']}`

    rows += `${name},${dateExam} ,${startTime}, ${dateExam}, ${endTime}, FALSE, ${desc}, ${location}, TRUE \n`
    lichThiData += rows
    rows = ''
  }
  return String(lichThiData)
}

const convertJson4LichHocCsv = (fileName) => {
  const json2Array = removeThings(JSON.parse(readFile(fileName)))

  let lichHocData = ''
  let rows = ''

  for (let i = 0; i < json2Array.length; i++) {
    const subject = json2Array[i]

    const weekList = subject['Tuần'].split(',')

    for (let k = 0; k < weekList.length; k++) {
      const learnDate = calcDate(convertDate(subject['Thứ']), weekList[k])
      const time = convertTime(subject['Tiết'])
      const startTime = time[0]
      const endTime = time[1]

      rows += `${subject['Tên học phần']}, ${learnDate}, ${startTime}, ${learnDate}, ${endTime}, FALSE, ${subject['CBGD']}, ${subject['Phòng']}, TRUE \n`
      lichHocData += rows
      rows = ''
    }
  }
  return String(lichHocData)
}

module.exports = {
  convertJson4LichThiCsv,
  convertJson4LichHocCsv,
  addTime,
  calcDate,
  convertDate,
  convertTime,
  removeThings,
  calcDate,
  convertExamDate
}
