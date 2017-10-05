const model = require('../models/studio')

let getAllStudio = (req, res) => {
  model.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getStudioById = (req, res) => {
  model.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let addStudio = (req, res) => {
  model.create({
    name: req.body.name,
    _theaterId: req.body.theaterId,
    _movieId: req.body.movieId,
    seatsTotal: req.body.seatsTotal,
    seatAvailable: req.body.seatAvailable,
    seatBooked: req.body.seatBooked
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editStudio = (req, res) => {
  model.findOneAndUpdate({
    _id: req.params.id
  }, {
    name: req.body.name,
    _theaterId: req.body.theaterId,
    _movieId: req.body.movieId,
    seatsTotal: req.body.seatsTotal,
    seatAvailable: req.body.seatAvailable,
    seatBooked: req.body.seatBooked
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteStudio = (req, res) => {
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
  getAllStudio,
  getStudioById,
  addStudio,
  editStudio,
  deleteStudio
}
