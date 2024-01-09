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
  result += header.join(', ')
  const sub = subjects(array)

  for (let i = 0; i < sub.length; i++) {
    for (let k = 0; k < sub[i].week.length; k++) {
      rows += `${sub[i].name + sub[i].room}, ${calcDate(
        sub[i].date,
        parseInt(parseInt(sub[i].week[k]))
      )}, ${sub[i].time[0]}, ${calcDate(
        sub[i].date,
        parseInt(sub[i].week[k])
      )}, ${sub[i].time[1]}, FALSE, , , \n`
      result += rows
      rows = ''
    }
  }
  return result
}
export function calcDate(dayOfWeek, weekNumber) {
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

const convertTime = (time) => {
  switch (time) {
    case 1:
      return ['7:00 AM', '9:30 AM']
    case 4:
      return ['9:30 AM', '12:00 PM']
    case 7:
      return ['1:00 PM', '3:30 PM']
    case 10:
      return ['3:30 PM', '6:00 PM']
    case 13:
      return ['6:00 PM', '8:30 PM']
  }
}

const convertRoom = (room) => {
  if (room === 'E-') {
    return 'E-LEARNING'
  }
  return room
}

export const subjects = (array) => {
  const subjects = []

  for (let i = 0; i < getSubjects(array).length; i++) {
    subjects.push({
      name: getSubjects(array)[i],
      date: convertDate(getDate(array)[i]),
      room: convertRoom(getRoom(array)[i]),
      time: convertTime(getTimeStart(array)[i]),
      week: getWeek(array)[i].toString().split(',')
    })
  }

  return subjects
}

export const getIndexSubjectName = (array) => {
  let result = []

  for (let i = 0; i < array.length; i++) {
    if (array[i]['Năm học: 2023-2024 - Học kỳ: HK02'] !== undefined) {
      result.push(array.indexOf(array[i]))
    }
  }
  result.push(array.length - 1)
  return result
}

export const getSubjects = (array) => {
  let listSubjects = []
  let subjectName = ''
  const index = getIndexSubjectName(array)
  // console.log(index)

  for (let k = 0; k < index.length; k++) {
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

export const getWeek = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_8'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Tuần')
}

export const getDate = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_4'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Thứ')
}

export const getTimeStart = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_5'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Tiết')
}

export const getRoom = (array) => {
  let result = []
  const index = getIndexSubjectName(array)
  for (let i = 0; i < index.length; i++) {
    result.push(array[index[i]]['__EMPTY_6'])
  }
  return result.filter((r) => r !== undefined).filter((r) => r !== 'Phòng')
}
