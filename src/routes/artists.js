const express = require('express')
const Artist = require('../models/artist')

const router = express.Router()

router.get('/artists', (req, res) => {
  Artist.find()
    .then((artists) => {
      res.json(artists)
    })
})

module.exports = router
