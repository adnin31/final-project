const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const should = chai.should()
const server = require('../app')

let data = {}
let Movie = require('../models/movie')

describe('Movie', () => {
    beforeEach((done) => {
      Movie.remove({}, (err) => {
        done()
      })
    })

    describe('/POST movie', () => {
        let movie = {
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
          }

        it('success input new movie', (done) => {
          chai.request(server)
            .post('/api/movie/')
            .send(movie)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('title')
              res.body.should.have.property('rate')
              res.body.should.have.property('production')
              res.body.should.have.property('casts')
              res.body.should.have.property('genre')
              done()
            })
        })

        it('it should not POST a movie without title field', (done) => {
          let movie = {
            overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
            poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
            trailer: 'https://youtu.be/9vN6DHB6bJc',
            rate: '18+',
            production: '20th century fox',
            casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
            genre: ['action', 'adventure', 'comedy'],
            yearProduction: '2016'
          }

          chai.request(server)
          .post('/api/movie/')
          .send(movie)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('errors')
            res.body.errors.should.have.property('title')
            done()
          })
        })
    })

    describe('/GET /api/movie', () => {
      it('get all movies', (done) => {
        chai.request(server)
        .get('/api/movie/')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
      })
    })

    describe('/GET /api/movie:id', () => {
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
      it('should get movie by id', (done) => {
        chai.request(server)
        .get(`/api/movie/${movie._id}`)
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.a('object')
            done()
        })
      })
    })

    describe('/PUT /api/movie/:id', () => {
        it('should put movie by id', (done) => {
          let movie2 = new Movie({
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
            let newTitle = 'new title movie'
            movie2.save((err, mv) => {
              chai.request(server)
              .put(`/api/movie/` + movie2._id)
              .send({
                title: 'New Title',
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
              .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
            })
        })
    })

    describe('/DELETE /api/movie/:id', () => {
        let movie3 = new Movie({
            title: 'Deadpoll',
            overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
            poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
            trailer: 'https://youtu.be/9vN6DHB6bJc',
            rate: '18+',
            production: '20th century fox',
            casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
            genre: ['action', 'adventure', 'comedy'],
            yearProduction: '2016'
          })

        it('should delete movie', (done) => {
            chai.request(server)
            .delete('/api/movie/' + movie3._id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('ok').eql(1)
                done()
            })
        })
        it('delete data not found id', (done) => {
            chai.request(server)
            .delete(`/api/movie/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Movie\"")
                res.body.should.have.property('name').eql("CastError")
                res.body.should.have.property('kind').eql("ObjectId")
                res.body.should.have.property('path').eql("_id")
                res.body.should.have.property('value').eql("12345")
                done()
            })
        })
    })
})
