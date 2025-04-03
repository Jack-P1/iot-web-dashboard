const express = require('express')
const app = express()
const cors = require("cors")
const cron = require('node-cron');
const port = 3000

const user = require('./routes/user')
const stock = require('./routes/stock')
const branch = require('./routes/branch')

const jobs = require('./cron/jobs')

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use('/api/user', user)
app.use('/api/stock', stock)
app.use('/api/branch', branch)

cron.schedule('* * * * *', () => {
  jobs.getBatchMqttData()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

