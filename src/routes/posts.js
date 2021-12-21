const router = require('express').Router()
const postController = require('../controller/post')

//create a post
router.post('/', postController.createPost)
//endpoint to update post by their id
router.put('/:id', postController.updatePost)
//endpoint to delete post by their id
// router.delete('/:id', postController.deletePost)
//get posts
// router.get('/:id', postController.getPost)

module.exports = router
