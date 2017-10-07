const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const index = require('./routes/index')
const booking = require('./routes/booking')
const movie = require('./routes/movie')
const movieShowTime = require('./routes/movieShowTime')
const studio = require('./routes/studio')
const theater = require('./routes/theater')
const user = require('./routes/user')

mongoose.connect(`mongodb://adnin31:enggakadapasswordnya@ecommerce-shard-00-00-pmhx7.mongodb.net:27017,ecommerce-shard-00-01-pmhx7.mongodb.net:27017,ecommerce-shard-00-02-pmhx7.mongodb.net:27017/finalproject?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin`, (err) => {
  err ? console.log('can\'t connect to database', err.errors[0].err) : console.log('database connected')
})

// var uriDb = `mongodb://adnin31:enggakadapasswordnya@ecommerce-shard-00-00-pmhx7.mongodb.net:27017,ecommerce-shard-00-01-pmhx7.mongodb.net:27017,ecommerce-shard-00-02-pmhx7.mongodb.net:27017/finalproject?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin`
// MongoClient.connect(uriDb, function (err, db) {
//   if (!err) db.close()
// })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/api/booking', booking)
app.use('/api/movie', movie)
app.use('/api/movieShowTime', movieShowTime)
app.use('/api/studio', studio)
app.use('/api/theater', theater)
app.use('/api/user', user)

app.listen(process.env.PORT || 3000)
