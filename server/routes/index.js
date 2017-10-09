const express = require('express')
const router = express.Router()

const sendMail = require('../controllers/sendEmail')

router.get('/', function (req, res, next) {
  res.send('wellcome to vr movie book ticketing system')
})

router.post('/sendmail', sendMail)

module.exports = router
