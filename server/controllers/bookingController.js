const model = require('../models/booking')

let getAllBooking = (req, res) => {
  model.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getBookingById = (req, res) => {
  model.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let addBooking = (req, res) => {
  model.create({
    time: req.body.time,
    price: req.body.price,
    _userId: req.body.userId,
    _movieShowTimeId: req.body.movieShowTimeId
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteBooking = (req, res) => {
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
  getAllBooking,
  getBookingById,
  addBooking,
  deleteBooking
}
