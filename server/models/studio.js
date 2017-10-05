const mongoose = require('mongoose')
const Schema = mongoose.Schema

let studioSchema = new Schema({
  name: {
    type: Number,
    required: [true, '{PATH} cannot empty']
  },
  _theaterId: [{
    type: Schema.Types.ObjectId,
    ref: 'Theater'
  }],
  _movieId: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  seatsTotal: {
    type: Number,
    required: [true, '{PATH} cannot empty']
  },
  seatAvailable: [{
    type: String
  }],
  seatBooked: [{
    type: String
  }]
})

let Studio = mongoose.model('Studio', studioSchema)

module.exports = Studio
