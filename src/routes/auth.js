const router = require('express').Router()
const authController = require('../controller/auth')

//CREATE -> POST = post the informations when the user register their account
router.post("/register", authController.register)

//user login with their registered account
router.post('/login', authController.login)
module.exports = router
