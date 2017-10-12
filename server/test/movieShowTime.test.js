const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const should = chai.should()
const server = require('../app')

let data = {}
let MovieShowTime = require('../models/movieShowTime')
let Movie = require('../models/movie')
let Studio = require('../models/studio')
  
describe('movieShowTime', () => {
    before((done) => {
      MovieShowTime.remove({}, (err) => {
        done()
      })
    })

    describe('/POST movieShowTime', () => {
        let movie = new Movie({
            title: 'Deadpoll',
            overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
            poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
            trailer: 'https://youtu.be/9vN6DHB6bJc',
            rate: '18+',
            showDate: new Date(),
            production: '20th century fox',
            casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
            genre: ['action', 'adventure', 'comedy'],
            yearProduction: '2016',
            _studioId: ['1'],
            _movieShowTimeId: ['19.00', '21.00']
        })
        
        let studio = new Studio({
            name: '1',
            _movieId: movie._id
        })
        
        let movieShowTime = {
            _movieId: movie._id,
            _studioId: studio._id,
            showDate: new Date(),
            startTime: '19.00',
            seatsTotal: 5,
            seatAvailable: ['1','2','3'],
            seatBooked: ['4','5']
          }

        it('success input new movieShowTime', (done) => {
          chai.request(server)
            .post('/api/movieShowTime/')
            .send(movieShowTime)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('showDate')
              res.body.should.have.property('startTime')
              res.body.should.have.property('seatsTotal')
              res.body.should.have.property('seatAvailable')
              res.body.should.have.property('seatBooked')
              done()
            })
        })

        it('it should not POST a movieShowTime without title startTime', (done) => {
            let movie = new Movie({
                title: 'Deadpoll',
                overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
                poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
                trailer: 'https://youtu.be/9vN6DHB6bJc',
                rate: '18+',
                production: '20th century fox',
                casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
                genre: ['action', 'adventure', 'comedy'],
                yearProduction: '2016',
                _studioId: ['1'],
                _movieShowTimeId: ['19.00', '21.00']
            })
            
            let studio = new Studio({
                name: '1',
                _movieId: movie._id
            })

          let movieShowTime = {
            _movieId: movie._id,
            _studioId: studio._id,
            seatsTotal: 5,
            seatAvailable: ['1','2','3'],
            seatBooked: ['4','5']
          }

          chai.request(server)
          .post('/api/movieShowTime/')
          .send(movieShowTime)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('errors')
            res.body.errors.should.have.property('startTime')
            done()
          })
        })
    })

    describe('/DELETE /api/movieShowTime/:id', () => {
        let movie = new Movie({
            title: 'Deadpoll',
            overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
            poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
            trailer: 'https://youtu.be/9vN6DHB6bJc',
            rate: '18+',
            production: '20th century fox',
            casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
            genre: ['action', 'adventure', 'comedy'],
            yearProduction: '2016',
            _studioId: ['1'],
            _movieShowTimeId: ['19.00', '21.00']
        })
        
        let studio = new Studio({
            name: '1',
            _movieId: movie._id
        })
        
        let movieShowTime = {
            _movieId: movie._id,
            _studioId: studio._id,
            startTime: '19.00',
            seatsTotal: 5,
            seatAvailable: ['1','2','3'],
            seatBooked: ['4','5']
          }

        it('should delete movieShowTime should get return object', (done) => {
            chai.request(server)
            .delete('/api/movieShowTime/' + movieShowTime._id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        })

        it('delete data not found id and have property name of CastError', (done) => {
            chai.request(server)
            .delete(`/api/movieShowTime/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"MovieShowTime\"")
                res.body.should.have.property('name').eql("CastError")
                done()
            })
        })
        it('delete data not found id and have property kind of ObjectId', (done) => {
            chai.request(server)
            .delete(`/api/movieShowTime/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('kind').eql("ObjectId")
                done()
            })
        })
        it('delete data not found id and have property path of _id', (done) => {
            chai.request(server)
            .delete(`/api/movieShowTime/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('path').eql("_id")
                done()
            })
        })
        it('delete data not found id and have property value of 12345', (done) => {
            chai.request(server)
            .delete(`/api/movieShowTime/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"MovieShowTime\"")
                res.body.should.have.property('value').eql("12345")
                done()
            })
        })
    })

})
