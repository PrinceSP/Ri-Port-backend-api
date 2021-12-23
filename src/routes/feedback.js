const router = require('express').Router()
const feedbackController = require('../controller/feedback')

//create a feedback
router.post('/',feedbackController.createFeedback)
//get feedback
router.get('/:id', feedbackController.getPost)

module.exports = router
