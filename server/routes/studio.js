const express = require('express')
const router = express.Router()
const controller = require('../controllers/studioController')

router.get('/', controller.getAllStudio)
router.get('/:id', controller.getStudioById)
router.post('/', controller.addStudio)
router.put('/:id', controller.editStudio)
router.delete('/:id', controller.deleteStudio)

module.exports = router
