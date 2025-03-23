const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user')
const stock = require('./routes/stock')
const branch = require('./routes/branch')

app.use(express.json())
app.use('/api/user', user)
app.use('/api/stock', stock)
app.use('/api/branch', branch)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

