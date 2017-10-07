const model = require('../models/movie')

let getAllMovie = (req, res) => {
  model.find()
  .populate({path: '_movieShowTimeId'})
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getMovieById = (req, res) => {
  model.findById(req.params.id)
  .populate({path: '_movieShowTimeId'})
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let addMovie = (req, res) => {
  model.create({
    title: req.body.title,
    overview: req.body.overview,
    poster: req.body.poster,
    trailer: req.body.trailer,
    rate: req.body.rate,
    production: req.body.production,
    casts: req.body.casts,
    genre: req.body.genre,
    yearProduction: req.body.yearProduction,
    _studioId: req.body.studioId,
    _movieShowTimeId: req.body.movieShowTimeId
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editMovie = (req, res) => {
  model.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title,
    overview: req.body.overview,
    poster: req.body.poster,
    trailer: req.body.trailer,
    rate: req.body.rate,
    production: req.body.production,
    casts: req.body.casts,
    genre: req.body.genre,
    yearProduction: req.body.yearProduction,
    _movieShowTimeId: req.body.movieShowTimeId
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteMovie = (req, res) => {
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
  getAllMovie,
  getMovieById,
  addMovie,
  editMovie,
  deleteMovie
}
