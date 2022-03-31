const router = require('express').Router()
const authController = require('../controller/auth')

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/verify-email',authController.verifyEmail)
router.post('/smsOtpToPhone',authController.smsOtpToPhone)
router.post('/verifyPhoneNumber',authController.verifyPhoneNumber)

module.exports = router
