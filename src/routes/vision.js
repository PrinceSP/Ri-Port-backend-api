const router = require('express').Router()
const visionController = require('../controller/vision')

router.get('/',visionController.quickstart)

module.exports = router
