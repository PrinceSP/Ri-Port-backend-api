const Post = require('../model/post')

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
      return res.status(403).json('you can only update your post')
    }
  } catch(e){
    return res.status(500).json(e)
  }

}

exports.deletePost = async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    if ( post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json('post has been deleted')
    } else{
      return res.status(403).json('you can only delete your post')
    }
  } catch(e){
    return res.status(500).json(e)
  }
}

exports.getPost = async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch(e){
    return res.status(500).json(e)
  }
}
