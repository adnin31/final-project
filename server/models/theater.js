const mongoose = require('mongoose')
const Schema = mongoose.Schema

let theaterSchema = new Schema({
  name: {
    type: String,
    required: [true, '{PATH cannot empty}']
  },
  address: {
    type: String,
    required: [true, '{PATH cannot empty}']
  }
})

let Theater = mongoose.model('Theater', theaterSchema)

module.exports = Theater
