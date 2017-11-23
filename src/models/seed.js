const Artist = require('./artist')

// List artists
Artist.find()
  .then((artists) => {
    console.log('artists', artists)
  })

  // Create artists
Artist.create([
  { name: 'Phoenix' },
  { name: 'Radiohead' },
  { name: 'Franz Ferdinand' }
])
