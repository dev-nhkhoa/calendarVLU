const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`CalenVLU is running on port ${PORT}`)
})

app.use('/api/v1/', require('./routes/api.v1.route'))

app.use('/google/', require('./routes/google'))

app.get('/', (req, res) => {
  res.send('CalenVLU Server is working good!')
})
