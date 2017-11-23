const mongoose = require('./init')

const Artist = mongoose.model('Artist', {
  name: String
})

module.exports = Artist
