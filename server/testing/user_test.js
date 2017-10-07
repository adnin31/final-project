const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app')
const should = chai.should()


const User = require('../models/user')

describe ('POST /user', () => {
    
})
