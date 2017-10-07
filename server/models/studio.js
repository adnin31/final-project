const mongoose = require('mongoose')
const Schema = mongoose.Schema

let studioSchema = new Schema({
  name: {
    type: Number,
    required: [true, '{PATH} cannot empty']
  },
  _movieId: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }]
})

let Studio = mongoose.model('Studio', studioSchema)

module.exports = Studio
