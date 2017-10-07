const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, '{PATH} cannot empty']
  },
  password: {
    type: String,
    required: [true, '{PATH} cannot empty']
  },
  email: {
    type: String,
    required: [true, '{PATH} cannot empty']
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
