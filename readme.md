# Mongoose vs ActiveRecord

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