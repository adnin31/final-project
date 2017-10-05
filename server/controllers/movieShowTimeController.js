const model = require('../models/movieShowTime')

let getAllMovieShowTime = (req, res) => {
  model.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getMovieShowTimeById = (req, res) => {
  model.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let addMovieShowTime = (req, res) => {
  model.create({
    _movieId: req.body.movieId,
    _studioId: req.body.studioId,
    startTime: req.body.startTime
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => [
    res.send(err)
  ])
}

let editMovieShowTime = (req, res) => {
  model.findOneAndUpdate({
    _id: req.params.id
  }, {
    _movieId: req.body.movieId,
    _studioId: req.body.studioId,
    startTime: req.body.startTime
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteMovieShowTime = (req, res) => {
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
  getAllMovieShowTime,
  getMovieShowTimeById,
  addMovieShowTime,
  editMovieShowTime,
  deleteMovieShowTime
}
