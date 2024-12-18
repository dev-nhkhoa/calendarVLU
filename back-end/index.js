require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { createFolderIfNotExists } = require('./src/utils/handleFiles')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v2/', require('./src/routes/api.v2'))

app.use('/google/', require('./src/routes/google'))

app.get('/', (req, res) => {
  res.send('CalenVLU Server is working good!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`CalenVLU is running on port ${PORT}`)
  createFolderIfNotExists('./filesStorage')
})
