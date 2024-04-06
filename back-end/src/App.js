require('dotenv').config()

const express = require('express')
const cors = require('cors')
const {
  createFolderIfNotExists,
  recreateFolderPeriodically
} = require('./utils/handleFiles')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v2/', require('./routes/api.v2'))

app.use('/google/', require('./routes/google'))

app.get('/', (req, res) => {
  res.send('CalenVLU Server is working good!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`CalenVLU is running on port ${PORT}`)
  recreateFolderPeriodically('./filesStorage', 1800000)
})
