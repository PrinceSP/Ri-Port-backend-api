const router = require('express').Router()
const userController = require('../controller/users')

router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
