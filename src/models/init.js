const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/music', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose