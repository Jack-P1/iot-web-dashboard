const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user')
const stock = require('./routes/stock')

app.use(express.json())
app.use('/api/users', user)
app.use('/api/stock', stock)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

