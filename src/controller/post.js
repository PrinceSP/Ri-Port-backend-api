const Post = require('../model/post')
const User = require('../model/User')

exports.createPost = async (req,res)=>{
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).send(savedPost)
  } catch (e) {
    return res.status(500).json(e)
  }
}

exports.updatePost = async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    if ( post.userId === req.body.userId) {
      await post.updateOne({$set: req.body})
      res.status(200).json('post has been updated')
    } else{
      res.status(403).json('you can only update your post')
    }
  } catch(e){
    return e
  }

}

//delete only one post with its current user id
exports.deletePost = async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    if ( post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json('post has been deleted')
    } else{
      res.status(403).json('you can only delete your post')
    }
  } catch(e){
    res.status(500).json(e)
  }
}

//get single post
exports.getPost = async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch(e){
    res.status(500).json(e)
  }
}

//get current user posts list
exports.getPostsList = async (req,res)=>{
  try{
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({userId:currentUser._id})
    res.status(200).json(userPosts)
  } catch(e){
    res.status(500).json(e)
  }
}

//get users posts list
exports.getAllPostsList = async (req,res)=>{
  try{
    const userPosts = await Post.find().sort({_id:-1})
    res.status(200).json(userPosts)
  } catch(e){
    res.status(500).json(e)
  }
}
