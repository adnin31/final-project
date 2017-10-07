const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookingController')

router.get('/', controller.getAllBooking)
router.get('/:id', controller.getBookingById)
router.post('/', controller.addBooking)
router.delete('/:id', controller.deleteBooking)

module.exports = router
