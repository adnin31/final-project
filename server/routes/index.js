var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.send('wellcome to vr movie book ticketing system')
})

module.exports = router
