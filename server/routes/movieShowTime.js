const express = require('express')
const router = express.Router()
const controller = require('../controllers/movieShowTimeController')

router.get('/', controller.getAllMovieShowTime)
router.get('/:id', controller.getMovieShowTimeById)
router.post('/', controller.addMovieShowTime)
router.put('/:id', controller.editMovieShowTime)
router.delete('/:id', controller.deleteMovieShowTime)

module.exports = router
