const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app')
const should = chai.should()

const Studio = require('../models/studio')
const Movie = require('../models/movie')

describe('Studio', () => {
    before((done) => {
      Studio.remove({}, (err) => {
        done()
      })
    })

    describe('/GET /api/studio', () => {
        it('get all studio', (done) => {

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

          chai.request(server)
          .get('/api/studio/')
          .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              done()
          })
        })
      })

      describe('GET /api/movie/:id', () => {
        it('should get studio wrong id and should have property name of CastError', (done) => {
          chai.request(server)
          .get(`/api/studio/12345`)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.a('object')
              res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
              res.body.should.have.property('name').eql("CastError")
              done()
          })
        })

        it('should get studio wrong id and should have property kind of ObjectId', (done) => {
          chai.request(server)
          .get(`/api/studio/12345`)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.a('object')
              res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
              res.body.should.have.property('kind').eql("ObjectId")
              done()
          })
        })

        it('should get studio wrong id and should have property path of _id', (done) => {
          chai.request(server)
          .get(`/api/studio/12345`)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.a('object')
              res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
              res.body.should.have.property('path').eql("_id")
              done()
          })
        })

        it('should get studio wrong id and should have property value equal of 12345', (done) => {
          chai.request(server)
          .get(`/api/studio/12345`)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.a('object')
              res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
              res.body.should.have.property('value').eql("12345")
              done()
          })
        })
    })

  

      describe('POST /api/studio', () => {
          it('POST new studio', (done) => {
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
            chai.request(server)
            .post('/api/studio/')
            .send(studio)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('name')
                res.body.should.have.property('_movieId')
                done()
            })
          })
      })

      describe('/DELETE /api/studio/:id', () => {
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

        it('should delete studio should get return object', (done) => {
            chai.request(server)
            .delete('/api/studio/' + studio._id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        })

        it('should delete studio and should have property ok equal 1', (done) => {
            chai.request(server)
            .delete('/api/studio/' + studio._id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('ok').eql(1)
                done()
            })
        })

        it('delete data not found id and have property name of CastError', (done) => {
            chai.request(server)
            .delete(`/api/studio/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
                res.body.should.have.property('name').eql("CastError")
                done()
            })
        })
        it('delete data not found id and have property kind of ObjectId', (done) => {
            chai.request(server)
            .delete(`/api/studio/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('kind').eql("ObjectId")
                done()
            })
        })
        it('delete data not found id and have property path of _id', (done) => {
            chai.request(server)
            .delete(`/api/studio/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('path').eql("_id")
                done()
            })
        })
        it('delete data not found id and have property value of 12345', (done) => {
            chai.request(server)
            .delete(`/api/studio/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"Studio\"")
                res.body.should.have.property('value').eql("12345")
                done()
            })
        })
    })

    })