const mongoose = require('mongoose')
const Schema = mongoose.Schema

let theaterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

let Theater = mongoose.model('Theater', theaterSchema)

module.exports = Theater
