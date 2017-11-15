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
  artist: String,
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
| Model.all | Model.find() |
| Model.where(attributes) | Model.find(conditions) |
| Model.find(id) | Model.findById() |
| Model.find_by(attributes) | Model.findOne(conditions) |
| Model.destroy(attributes) | Model.remove(conditions) |
| Model.new(attributes) | new Model(doc) |
| Model.count | Model.count() |
| record.save | record.save() |
| record.destroy | record.remove() |
| record.includes(:director) | record.populate('director') |


## Challenges

### Todo Item

1. Create a model for a todo item
2. Write out the steps (migration / code) for making it using Rails
3. Write out the steps (code) for making it using Mongoose
4. Write Rails code for querying the following:
  - All todo items
  - All completed todo items
  - All incomplete todo items
  - Finding a specific todo item
  - Changing a todo item’s description and persisting it to the database
5. Write Mongoose code for the above list of items


### Recipe


