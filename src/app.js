const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user')

app.use('/api/users', user)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

