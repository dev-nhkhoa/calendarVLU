require('dotenv').config()

const fs = require('fs')
const path = require('path')
const tabletojson = require('tabletojson').tabletojson

const readFile = (fileName) => {
  return fs.readFileSync(`./filesStorage/${fileName}`, {
    encoding: 'utf-8'
  })
}

const writeFile = (fileName, data, isNormal) => {
  const newData = isNormal ? JSON.stringify(data, null, 2) : data

  fs.writeFileSync(`./filesStorage/${fileName}`, newData, (err) => {
    console.error(err)
    return false
  })
  return true
}

const saveFile = (fileName, data) => {
  console.log(String(data) + 'hi')
  fs.writeFileSync(`./filesStorage/${fileName}`, data, (err) => {
    if (err) {
      console.error(err)
      return false
    }
  })
  return true
}

const checkIsValidCalendar = (fileName) => {
  const locateFile = readFile(fileName)
  const convert2Json = tabletojson.convert(locateFile)
  const saveFileName = String(fileName).replace('.html', '.json')

  if (!writeFile(saveFileName, convert2Json, true)) return false

  return readFile(saveFileName).length == 2 ? false : true
}

const handleWriteFileToCsv = async (fileName, data, res) => {
  if (!writeFile(fileName, data, false)) {
    res.status(500).json('Lưu file thất bại!')
    return
  }
  res.download(path.resolve(process.cwd(), `./filesStorage/${fileName}`))
}

const recreateFolderPeriodically = (folderPath, interval) => {
  // Xóa thư mục ban đầu (nếu tồn tại)
  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true })
    console.log(`Deleted folder: ${folderPath}`)
  }

  // Tạo thư mục ban đầu
  fs.mkdirSync(folderPath)
  console.log(`Created folder: ${folderPath}`)

  // Thiết lập chu kỳ xóa và tạo lại thư mục
  setInterval(() => {
    // Xóa thư mục (nếu tồn tại)
    if (fs.existsSync(folderPath)) {
      fs.rmdirSync(folderPath, { recursive: true })
      console.log(`Deleted folder: ${folderPath}`)
    }

    // Tạo thư mục mới
    fs.mkdirSync(folderPath)
    console.log(`Created folder: ${folderPath}`)
  }, interval)
}

module.exports = {
  handleWriteFileToCsv,
  checkIsValidCalendar,
  saveFile,
  readFile,
  writeFile,
  recreateFolderPeriodically
}
