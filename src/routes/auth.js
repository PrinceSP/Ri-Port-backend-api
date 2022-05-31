const router = require('express').Router()
const {register,login,verifyEmail,smsOtpToPhone,verifyPhoneNumber} = require('../controller/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/verify-email',verifyEmail)
router.post('/smsOtpToPhone',smsOtpToPhone)
router.post('/verifyPhoneNumber',verifyPhoneNumber)

module.exports = router
