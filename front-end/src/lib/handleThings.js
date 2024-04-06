import Cookies from 'js-cookie'

const createDropdownYear = () => {
  const year = []
  const yearNow = new Date().getFullYear()
  for (let i = yearNow - 1; i < yearNow + 1; i++) {
    year.push(`${i}-${i + 1}`)
  }
  return year
}

const createDropdownTermID = () => {
  const hk = []
  for (let i = 1; i <= 3; i++) {
    hk.push(`HK0${i}`)
  }
  return hk
}

const saveUserIDToCookie = (userID, expirationDays) => {
  Cookies.set('userID', userID, { expires: expirationDays })
}

const generateRandomUserID = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from(
    { length: 10 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('')
}

const downloadFile = (data, fileName) => {
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export {
  createDropdownTermID,
  createDropdownYear,
  saveUserIDToCookie,
  generateRandomUserID,
  downloadFile
}
