const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const server = require('../app');
const should = chai.should();

let Movie = require('../models/movies')


describe('Movie', () => {
    beforeEach((done) => {
        
    })
    let deadpool = {
        title: 'Deadpoll',
        overview: 'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
        poster: 'https://image.tmdb.org/t/p/w640/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
        trailer: 'https://youtu.be/9vN6DHB6bJc',
        rate: 7.8,
        production: '20th century fox',
        casts: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano'],
        genre: ['action', 'adventure', 'comedy'],
        time: ''
    }
    it('success input new movie', done => {
        chai.request('http://localhost:3000')
        .post('/api/movies/')
        .send(deadpool)
        .end((err, movie) => {
            movie.should.have.status(200);
            movie.body.should.be.an('object');
            done();
        })
    })
    it('get all movies', done => {
        chai.request('http://localhost:3000')
        .get('/api/movies/')
    })

})