const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  poster: String,
  trailer: String,
  rate: {
    type: String,
    required: true
  },
  production: String,
  casts: [
    {
      type: String,
      required: true
    }
  ],
  genre: [{
    type: String,
    required: true
  }],
  yearProduction: {
    type: String,
    required: true
  },
  _studioId: [{
    type: Schema.Types.ObjectId,
    ref: 'Studio'
  }],
  _movieShowTimeId: [{
    type: Schema.Types.ObjectId,
    ref: 'MovieShowTime'
  }]
})

let Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
