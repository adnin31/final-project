const express = require('express')
const router = express.Router()
const controller = require('../controllers/movieController')

router.get('/', controller.getAllMovie)
router.get('/:id', controller.getMovieById)
router.post('/', controller.addMovie)
router.put('/:id', controller.editMovie)
router.delete('/:id', controller.deleteMovie)

module.exports = router
