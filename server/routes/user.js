const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get('/', controller.getAllUser)
router.get('/:id', controller.getUserById)
router.post('/signin', controller.signIn)
router.post('/signup', controller.signUp)
router.delete('/:id', controller.deleteUser)

module.exports = router
