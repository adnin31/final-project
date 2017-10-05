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
    required: [true, '{PATH cannot empty}']
  },
  production: {
    type: String,
    required: [true, '{PATH cannot empty}']
  },
  casts: [
    {
      type: String,
      required: [true, '{PATH cannot empty}']
    }
  ],
  genre: {
    type: String,
    required: [true, '{PATH cannot empty}']
  },
  time: Date,
  _theaterId: [{
    type: Schema.ObjectId,
    ref: 'Theater'
  }]
})

let Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
