const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10)
require('dotenv').config()

let getAllUser = (req, res) => {
  model.find()
  .then(response => {
    console.log('respon get all user: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getUserById = (req, res) => {
  model.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let signUp = (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, salt)
  model.create({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let signIn = (req, res) => {
  model.findOne({
    username: req.body.username
  })
  .then(response => {
    console.log('response ================', process.env.SECRET_KEY)
    if (response != null) {
      if (bcrypt.compareSync(req.body.password, response.password)) {
        var token = jwt.sign({_id: response._id, username: response.username}, process.env.SECRET_KEY)
        console.log('token =============== ', token)
        res.send({
          token: token,
          _id: response._id,
          username: response.username
        })
      } else {
        res.send('password salah')
      }
    } else {
      res.send('username yg dimasukkan salah')
    }
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteUser = (req, res) => {
  model.remove({
    _id: req.params.id
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllUser,
  getUserById,
  signIn,
  signUp,
  deleteUser
}
