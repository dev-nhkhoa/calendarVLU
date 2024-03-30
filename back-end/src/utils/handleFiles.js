const tabletojson = require('tabletojson').tabletojson
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const unlinkFiles = () => {
  fs.unlink(process.env.FILE_HTML, (err) => {})
  fs.unlink(process.env.FILE_JSON, (err) => {})
}

// Hàm convert HTML table -> json
// return lại table để hiển thị cho user bên FE hoặc string thông báo đăng nhập thất bại
const convertTable2JSON = (HTMLTable) => {
  const locateFile = fs.readFileSync(
    path.resolve(process.cwd(), `./${process.env.FILE_HTML}`),
    {
      encoding: 'utf-8'
    }
  )

  const converted = tabletojson.convert(locateFile)

  // Save file converted.json
  fs.writeFileSync(
    process.env.FILE_JSON,
    JSON.stringify(converted, null, 2),
    (err) => {
      if (err) console.error(err)
    }
  )

  if (
    fs.readFileSync(path.resolve(process.cwd(), `./${process.env.FILE_JSON}`), {
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

module.exports = { convertTable2JSON, unlinkFiles, saveFile, readFile }
