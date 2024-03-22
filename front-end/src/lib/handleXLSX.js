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

export const toCSV = (array) => {
  let result = ''
  let rows = ''
  // Add 1 dòng của header cho đúng format file import
  result += header.join(', ')
  const sub = subjects(array)

  for (let i = 0; i < sub.length; i++) {
    for (let k = 0; k < sub[i].week.length; k++) {
      rows += `${sub[i].name}, ${calcDate(
        sub[i].date,
        parseInt(parseInt(sub[i].week[k]))
      )}, ${sub[i].time[0]}, ${calcDate(
        sub[i].date,
        parseInt(sub[i].week[k])
      )}, ${sub[i].time[1]}, FALSE, , ${sub[i].room}, \n`
      result += rows
      rows = ''
    }
  }
  return result
}

const subjects = (array) => {
  const subjects = []

  for (let i = 0; i < getSubjects(array).length; i++) {
    subjects.push({
      name: getSubjects(array)[i],
      date: convertDate(getDate(array)[i]),
      room: convertRoom(getRoom(array)[i]),
      time: convertTime(getTime(array)[i]),
      week: getWeek(array)[i].toString().split(',')
    })
  }
  return subjects
}

const getIndexSubjectName = (array) => {
  let result = []
  for (let i = 1; i <= array.length - 1; i++) {
    if (array[i]['Năm học: 2023-2024 - Học kỳ: HK02'] !== undefined) {
      result.push(i)
    }
  }
  return result
}

export const getSubjects = (array) => {
  let listSubjects = []
  let subjectName = ''
  const index = getIndexSubjectName(array)

  for (let k = 0; k <= index.length; k++) {
    if (k === index.length) {
      subjectName += array[index[k - 1]]['__EMPTY_1']
      listSubjects.push(subjectName)
      subjectName = ''
      break
    }
    for (let i = index[k]; i < index[k + 1]; i++) {
      if (array[i]['__EMPTY_1'] === undefined) continue
      subjectName += array[i]['__EMPTY_1'] + ' '
    }
    listSubjects.push(subjectName)
    subjectName = ''
  }
  return listSubjects
    .filter((subject) => subject.length > 0)
    .filter((subject) => subject !== 'Tên học phần ')
    .filter((subject) => subject !== 'undefined ')
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
  const startWeek = 19
  const startDate = new Date('2024-01-08') // Ngày bắt đầu

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

export const getTime = (array) => {
  let listTimes = []
  let timeName = ''
  const index = getIndexSubjectName(array)

  for (let k = 0; k <= index.length; k++) {
    if (k === index.length) {
      timeName += array[index[k - 1]]['__EMPTY_5']
      listTimes.push(timeName)
      timeName = ''
      break
    }
    for (let i = index[k]; i < index[k + 1]; i++) {
      if (array[i]['__EMPTY_5'] === undefined) continue
      timeName += array[i]['__EMPTY_5'] + ' '
    }
    listTimes.push(timeName)
    timeName = ''
  }
  return listTimes
    .filter((subject) => subject.length > 0)
    .filter((subject) => subject !== 'Tiết ')
    .filter((subject) => subject !== 'undefined ')
}

export const getTimeStart = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_5'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Tiết')
}

const convertRoom = (room) => {
  if (room === 'E-') {
    return 'E-LEARNING'
  }
  return room
}

const getWeek = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_8'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Tuần')
}

const getDate = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_4'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Thứ')
}

const getRoom = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_6'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Phòng')
}