const express = require('express')
const router = express.Router()
const cron = require('node-cron')


// var task = cron.schedule('* */2 * * * *', () => {
//   console.log('test cron')
// }, false )

const sendMail = require('../controllers/sendEmail')

router.get('/', function (req, res, next) {
  res.send('wellcome to vr movie book ticketing system')
})

router.post('/sendmail', sendMail)

// router.get('/stopcron', (req, res) => {
//   task.stop()
//   res.send(task)
// })

module.exports = router
