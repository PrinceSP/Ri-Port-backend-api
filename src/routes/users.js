const router = require('express').Router()
const userController = require('../controller/users')

//endpoint to update user by their id
router.put('/:id', userController.updateUser)
//endpoint to delete user by their id
router.delete('/:id', userController.deleteUser)
//get a user
router.get('/:id', userController.getUser)
//get all user
router.get('/userList/all', userController.getAllUser)

module.exports = router
