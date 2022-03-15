const router = require('express').Router()
const feedbackController = require('../controller/feedback')

//create a feedback
router.post('/',feedbackController.createFeedback)
//get feedback
router.get('/', feedbackController.getPost)

module.exports = router
