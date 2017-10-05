const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieShowTimeSchema = new Schema({
  _movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  },
  _studioId: {
    type: Schema.Types.ObjectId,
    ref: 'Studio'
  },
  startTime: {
    type: Date,
    required: [true, '{PATH} cannot empty']
  }
})

let MovieShowTime = mongoose.model('MovieShowTime', movieShowTimeSchema)

module.exports = MovieShowTime
