const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json())

server.use('/', [
  require('./routes/artists'),
])

server.listen(7000, () => {
  console.log('Started at http://localhost:7000')
})