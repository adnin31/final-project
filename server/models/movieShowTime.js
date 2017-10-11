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
  showDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  seatsTotal: {
    type: Number,
    required: true
  },
  seatAvailable: [{
    type: String
  }],
  seatBooked: [{
    type: String
  }]
})

let MovieShowTime = mongoose.model('MovieShowTime', movieShowTimeSchema)

module.exports = MovieShowTime
