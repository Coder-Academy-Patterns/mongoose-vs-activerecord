# Mongoose vs ActiveRecord


## Defining models

### ActiveRecord
```
> rails generate model Song name artist album genre duration_seconds:integer
> rails db:migrate
```

```rb
gangnam_style = Song.new(name: 'Gangnam Style', artist: 'Psy', album: 'Psy 6 (Six Rules), Part 1', genre: 'K-pop', duration_seconds: 219)
if gangnam_style.save
  # Successfully saved
else
  # Handle error
end
```

### Mongoose
```js
const mongoose = require('mongoose');

const Song = mongoose.model('Song', {
  name: String,
  artist: String,
  album: String,
  genre: String,
  durationSeconds: Number
});
```

```js
const gangnamStyle = new Song({ name: 'Gangnam Style', artist: 'Psy', album: 'Psy 6 (Six Rules), Part 1', genre: 'K-pop', durationSeconds: 219 })
gangnamStyle.save()
  .then(() => {
    // Successfully saved
  })
  .catch((error) => {
    // Handle error
  })
```


## Queries cheat sheet

| ActiveRecord | Mongoose |
---------------|----------|
| Model.**all** | Model.**find**() |
| Model.**where**(attributes) | Model.**find**(conditions) |
| Model.**find**(id) | Model.**findById**() |
| Model.**find_by**(attributes) | Model.**findOne**(conditions) |
| Model.**new**(attributes) | new Model(doc) |
| Model.**destroy**(id) | Model.**findByIdAndRemove**(id) |
| Model.**find_by**(conditions).**update**(changes) | Model.**findOneAndUpdate**(conditions, changes, { new: true }) |
| Model.**where**(conditions).**update_all**(changes) | Model.**updateMany**(conditions, changes) |
| Model.**count** | Model.**count**() |
| record.**save** | record.**save**() |
| record.**destroy** | record.**remove**() |
| record.**update**(changes) | record.**update**(changes, { new: true }) |
| record.**includes**(:director) | record.**populate**('director') |
| Model.**find_or_create_by**(attributes) | Model.**findOneAndUpdate**(attributes, attributes, { upsert: true, runValidators: true }) |
| Model.**increment_counter**(:attribute_name, id) | Model.**findByIdAndUpdate**(id, { $inc: { attribute: 1 } }) |


## Challenges

### Todo Item

1. Create a model for a todo item with description and completed
2. Write out the steps (migration / code) for making it using Rails
3. Write out the steps (code) for making it using Mongoose
4. Write Rails code for querying the following:
  - All todo items
  - All completed todo items
  - All incomplete todo items
  - Finding a specific todo item
  - Changing a todo item’s description and persisting it to the database
5. Write Mongoose code for the above list of items



## Relations

### ActiveRecord
```
> rails generate model Artist name
> rails generate model Album name artist:references
> rails generate model Genre name
> rails generate model Song name artist:references album:references genre:references duration_seconds:integer
> rails db:migrate
```

```rb
class Artist
  has_many :albums
  has_many :songs
end

class Album
  belongs_to :artist
  has_many :songs
end

class Genre
  has_many :songs
end

class Song
  belongs_to :artist
  belongs_to :album
  belongs_to :genre
end
```

```rb
psy = Artist.create!(name: 'Psy')
psy_6_rules = Album.create!(name: 'Psy 6 (Six Rules), Part 1', artist: psy)
k_pop = Genre.create!(name: 'K-pop')

gangnam_style = Song.new(name: 'Gangnam Style', artist: psy, album: psy_6_rules, genre: k_pop, duration_seconds: 219)
if gangnam_style.save
  # Successfully saved
else
  # Handle error
end
```

### Mongoose
```js
const mongoose = require('mongoose');

const Artist = mongoose.model('Artist', {
  name: String
});

const Album = mongoose.model('Album', {
  name: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }
});

const Genre = mongoose.model('Genre', {
  name: { // Only one genre can have a particular name
    type: String,
    unique: true
  }
});

const Song = mongoose.model('Song', {
  name: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  },
  durationSeconds: Number
});
```

```js
async function seed() {
  const psy = await Artist.create({ name: 'Psy' })
  const psy6Rules = await Album.create({ name: 'Psy 6 (Six Rules), Part 1', artist: psy })
  const kPop = await Genre.create({ name: 'K-pop' })
  const gangnamStyle = new Song({ name: 'Gangnam Style', artist: psy, album: psy6Rules, genre: kPop, durationSeconds: 219 })
  gangnamStyle.save()
    .then(() => {
      // Successfully saved
    })
    .catch((error) => {
      // Handle error
    })
}
```

```js
Artist.create({ name: 'Psy' })
  .then((psy) => (
    Album.create({ name: 'Psy 6 (Six Rules), Part 1', artist: psy })
      .then((psy6Rules) => (
        Genre.create({ name: 'K-pop' })
          .then((kPop) => {
            const gangnamStyle = new Song({ name: 'Gangnam Style', artist: psy, album: psy6Rules, genre: kPop, durationSeconds: 219 })
            gangnamStyle.save()
              .then(() => {
                // Successfully saved
              })
              .catch((error) => {
                // Handle error
              })
          )
      })
  ))
```


### Recipe Challenge

1. Work out the models and attributes for a Recipe (e.g. recipe, ingredient, etc)
2. Plan the ERD
3. Write or create Rails migrations & models, with the relations between say recipe and ingredients
4. Write Mongoose models with relations
