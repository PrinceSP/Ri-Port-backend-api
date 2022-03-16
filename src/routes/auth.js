const router = require('express').Router()
const authController = require('../controller/auth')

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/verifiByUsername',authController.verifiByUsername)

module.exports = router
