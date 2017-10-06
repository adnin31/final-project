const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const should = chai.should()
const server = `http://localhost:3000`

let data = {}
let Movie = require('../models/movie')

describe('Movie', () => {
    describe('/POST movie', () => {
      let deadpool = {
        title: 'Deadpoll',
        overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
        poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
        trailer: 'https://youtu.be/9vN6DHB6bJc',
        rate: '18+',
        production: '20th century fox',
        casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
        genre: ['action', 'adventure', 'comedy'],
        yearProduction: '2016'
      }

        it('success input new movie', done => {
          chai.request(server)
            .post('/api/movie/')
            .send(deadpool)
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
    })

    describe('/GET /api/movie', () => {
      it('get all movies', done => {
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
      it('should get movie by id', done => {
          chai.request(server)
            .get(`/api/movie/59d5f98c442ccc319306ee16`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                done()
            })
      })
    })

    describe('/PUT /api/movie/:id', () => {
        it('should put movie by id', done => {
            let newTitle = 'new title movie'
            chai.request(server)
            .put(`/api/movie/59d5f98c442ccc319306ee16`)
            .send({title: newTitle})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('title', newTitle)
                done()
            })
        })
    })

    describe('/DELETE /api/movie/:id', () => {
        it('should delete movie', done => {
            chai.request(server)
            .delete(`/api/movie/${data.movie[1]}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.have.property('ok').eql(1)
                res.body.result.should.have.property('n').eql(1)
            })
        })
    })
})
