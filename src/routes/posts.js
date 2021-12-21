const router = require('express').Router()

//endpoint to update post by their id
router.put('/:id', postController.updateUser)
//endpoint to delete post by their id
router.delete('/:id', postController.deleteUser)
//get posts
router.get('/:id', postController.getUser)

module.exports = router
