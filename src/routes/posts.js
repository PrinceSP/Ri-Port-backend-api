const router = require('express').Router()
const {createPost,updatePost,deletePost,getPost,getPostsList,getAllPostsList} = require('../controller/post')
// const multer = require('multer')
// const storage = multer.diskStorage({})
// const upload = multer({ storage: storage })
// const cloudinary = require('../utils/imageUpload')

//create a post
router.post('/',createPost)
//endpoint to update post by their id
router.put('/:id',updatePost)
//endpoint to delete post by their id
router.delete('/:id',deletePost)
//get posts
router.get('/:id',getPost)
//get current user post
router.get('/postsList/:userId',getPostsList)
//get all users posts list
router.get('/',getAllPostsList)
//upload image
// router.post('/upload-image',upload.single('testingImage'), async(req,res)=>{
//   try {
//     console.log(req.file);
//
//     const result = await cloudinary.uploader.upload(req.file.path,{
//       width:500,
//       height:500,
//       crop:'fill'
//     })
//
//     res.send(result);
//   } catch (e) {
//     return e
//   }
// })
module.exports = router
