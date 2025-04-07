const express = require('express')
const app = express()
const cors = require("cors")
const cron = require('node-cron');
const port = 3000

const user = require('./routes/user')
const stock = require('./routes/stock')
const branch = require('./routes/branch')
const item = require('./routes/item')

const jobs = require('./cron/jobs')

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use('/api/user', user)
app.use('/api/stock', stock)
app.use('/api/branch', branch)
app.use('/api/item', item)

cron.schedule('* * * * *', () => {
  try{
    const now = new Date(Date.now())
    const hour = now.getHours()
    
    if(hour >= 8 && hour < 21){
      jobs.getBatchMqttData()
    } else{
      console.log("CRON job skipped as outside scheduled time")
    }
  } catch(err){
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

