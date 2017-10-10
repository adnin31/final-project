const model = require('../models/movie')
const studio = require('../models/studio')
const movieShowTime = require('../models/movieShowTime')
const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyCAndawPNofKLlN9W3EjWGYtqYnH1CneSc",
  authDomain: "movie-trailer-175012.firebaseapp.com",
  databaseURL: "https://movie-trailer-175012.firebaseio.com",
  projectId: "movie-trailer-175012",
  storageBucket: "movie-trailer-175012.appspot.com",
  messagingSenderId: "584104791052"
}
firebase.initializeApp(config)

const database = firebase.database()


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
    console.log('-------------------> ', response._studioId[0])
    studio.findById(response._studioId[0], (err, res2) => {
        console.log('>>>>>>>>>>>>>>>',response._movieShowTimeId[0])
        for (let i = 0 ; i < response._studioId.length; i++) {
          console.log('ini studio')
          for (let k = 0 ; k < response._movieShowTimeId.length ; k++) {
            movieShowTime.findById(response._movieShowTimeId[k], (err, res3) => {
              console.log('ini movie show time', res3.seatsTotal)
              for (let j = 0 ; j < res3.seatsTotal ; j++) {
                console.log('ini seats', res3.startTime)
                database.ref(`${response.title}:${response._id}/studio${res2.name}/${res3.startTime.split('.').join(':')}/${j+1}/`).set({
                  status: true,
                  userid: '',
                  counter: 0
                })
              }
            })
          }
        }
    })
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
