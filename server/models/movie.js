const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieSchema = new Schema({
  title: {
    type: String,
    required: [true, '{PATH} cannot empty']
  },
  overview: {
    type: String,
    required: [true, '{PATH} cannot empty']
  },
  poster: String,
  trailer: String,
  rate: {
    type: String,
    required: [true, '{PATH} cannot empty']
  },
  production: String,
  casts: [
    {
      type: String,
      required: [true, '{PATH} cannot empty']
    }
  ],
  genre: [{
    type: String,
    required: [true, '{PATH cannot empty}']
  }],
  yearProduction: {
    type: String,
    required: [true, '{PATH} cannot empty']
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
