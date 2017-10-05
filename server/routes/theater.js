const express = require('express')
const router = express.Router()
const controller = require('../controllers/theaterController')

router.get('/', controller.getAllTheater)
router.get('/:id', controller.getTheaterById)
router.post('/', controller.addTheater)
router.put('/:id', controller.editTheater)
router.delete('/:id', controller.deleteTheater)

module.exports = router
