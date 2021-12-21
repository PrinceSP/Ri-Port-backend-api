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
      res.status(200).json('account has been updated')
    } else{
      return res.status(403).json('you can only update your account')
    }
  } catch(e){
    return res.status(500).json(e)
  }

}
