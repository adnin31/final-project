const model = require('../models/theater')

let getAllTheater = (req, res) => {
  model.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getTheaterById = (req, res) => {
  model.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let addTheater = (req, res) => {
  model.create({
    name: req.body.name,
    address: req.body.address
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editTheater = (req, res) => {
  model.findOneAndUpdate({
    _id: req.params.id
  }, {
    name: req.body.name,
    address: req.body.address
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteTheater = (req, res) => {
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
  getAllTheater,
  getTheaterById,
  editTheater,
  addTheater,
  deleteTheater
}
