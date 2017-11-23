const express = require('express')
const Artist = require('../models/artist')

const router = express.Router()

router.get('/artists', (req, res) => {
  Artist.find()
    .then((artists) => {
      res.json(artists)
    })
})

router.get('/artists/:id', (req, res) => {
  const id = req.params.id

  Artist.findById(id)
    .then((artist) => {
      if (artist) {
        res.json(artist)
      }
      else {
        res.status(404).json({ error: 'Artist not found' })
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})

router.post('/artists', (req, res) => {
  const attributes = req.body
  Artist.create(attributes)
    .then((artist) => {
      res.json(artist)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})

router.patch('/artists/:id', (req, res) => {
  const id = req.params.id

  const attributes = req.body
  Artist.findByIdAndUpdate(id, attributes, { new: true })
    .then((artist) => {
      res.json(artist)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})

module.exports = router
