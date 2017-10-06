const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookingSchema = new Schema({
  time: Date,
  price: {
    type: Number,
    required: true
  },
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _movieShowTimeId: [{
    type: Schema.Types.ObjectId,
    ref: 'MovieShowTime'
  }],
  bookStatus: false,
  seatNumber: [{
    type: String,
    required: [true, '{PATH} cannot empty']
  }]
})

let Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
