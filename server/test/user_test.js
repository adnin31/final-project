const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app')
const should = chai.should()


const Model = require('../models/user')

const user1 = {
  username: 'adnin',
  password: '12345',
  email: 'adnin31@gmail.com'
}

describe('User', () => {
    beforeEach((done) => {
      Model.remove({}, (err) => {
        done()
      })
    })

    describe('/GET /api/user', () => {
        it('get all user', (done) => {
          chai.request(server)
          .get('/api/user/')
          .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              done()
          })
        })
      })
    
    describe('GET /api/user/:id', () => {
          it('should get user wrong id and should have property name of CastError', (done) => {
            chai.request(server)
            .get(`/api/user/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                res.body.should.have.property('name').eql("CastError")
                done()
            })
          })

          it('should get user wrong id and should have property kind of ObjectId', (done) => {
            chai.request(server)
            .get(`/api/user/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                res.body.should.have.property('kind').eql("ObjectId")
                done()
            })
          })

          it('should get user wrong id and should have property path of _id', (done) => {
            chai.request(server)
            .get(`/api/user/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                res.body.should.have.property('path').eql("_id")
                done()
            })
          })

          it('should get user wrong id and should have property value equal of 12345', (done) => {
            chai.request(server)
            .get(`/api/user/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                res.body.should.have.property('value').eql("12345")
                done()
            })
          })

          it('should get user wrong id', (done) => {
            chai.request(server)
            .get(`/api/user/12345`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
                res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                res.body.should.have.property('name').eql("CastError")
                res.body.should.have.property('kind').eql("ObjectId")
                res.body.should.have.property('path').eql("_id")
                res.body.should.have.property('value').eql("12345")
                done()
            })
          })
        })

        describe('/SIGNIN /api/user/signin', () => {
            it('should signin as user registered', (done) => {
                let user2 = new Model({
                    username: 'adnin',
                    email: 'adnin31@gmail.com',
                    password: '12345'
                })
                chai.request(server)
                .post('/api/user/signin')
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
            })
        })
    
        describe('/DELETE /api/user/:id', () => {
            let user = new Model({
                username: 'adnin',
                password: '12345',
                email: 'adnin31@gmail.com'
              })
    
            it('should delete user should get return object', (done) => {
                chai.request(server)
                .delete('/api/user/' + user._id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
            })

            it('should delete user and should have property ok equal 1', (done) => {
                chai.request(server)
                .delete('/api/user/' + user._id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok').eql(1)
                    done()
                })
            })

            it('delete data not found id and have property name of CastError', (done) => {
                chai.request(server)
                .delete(`/api/user/12345`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                    res.body.should.have.property('name').eql("CastError")
                    done()
                })
            })
            it('delete data not found id and have property kind of ObjectId', (done) => {
                chai.request(server)
                .delete(`/api/user/12345`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('kind').eql("ObjectId")
                    done()
                })
            })
            it('delete data not found id and have property path of _id', (done) => {
                chai.request(server)
                .delete(`/api/user/12345`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('path').eql("_id")
                    done()
                })
            })
            it('delete data not found id and have property value of 12345', (done) => {
                chai.request(server)
                .delete(`/api/user/12345`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql("Cast to ObjectId failed for value \"12345\" at path \"_id\" for model \"User\"")
                    res.body.should.have.property('value').eql("12345")
                    done()
                })
            })
        })
    })
