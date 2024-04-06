require('dotenv').config()

const fs = require('fs')
const path = require('path')
const tabletojson = require('tabletojson').tabletojson

const readFile = (fileName) => {
  return (
    fs.readFileSync(`./filesStorage/${fileName}`),
    {
      encoding: 'utf-8'
    }
  )
}

const writeFile = (fileName, data, isNormal) => {
  const newData = isNormal ? JSON.stringify(data, null, 2) : data

  fs.writeFileSync(`./filesStorage/${fileName}`),
    newData,
    (err) => {
      console.error(err)
      return false
    }

  return true
}

const saveFile = (fileName, data) => {
  fs.writeFileSync(`./filesStorage/${fileName}`),
    data,
    (err) => {
      if (err) {
        console.error(err)
        return false
      }
    }

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
  res.download(`./filesStorage/${fileName}`)
}

module.exports = {
  handleWriteFileToCsv,
  checkIsValidCalendar,
  saveFile,
  readFile,
  writeFile
}
