const User = require('../model/User')
const bcrypt = require('bcrypt')

exports.updateUser = async (req,res)=>{
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try{
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
      } catch(e){
        return res.status(500).json(e)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id,
        {
          $set: req.body,
        })
      res.status(200).json('account has been updated')
    } catch (e) {
      return res.status(500).json(e)
    }
  } else{
    return res.status(403).json('you can only update your account')
  }
}

exports.deleteUser = async (req,res)=>{
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete({_id:req.params.id})
      res.status(200).json('account has been deleted')
    } catch (e) {
      return res.status(500).json(e)
    }
  } else{
    return res.status(403).json('you can only delete your account')
  }
}

exports.getUser = async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    const {password,updatedAt, ...other} = user._doc
    res.status(200).json(other)
  } catch (e) {
    return res.status(500).json(e)
  }
}

exports.getAllUser = async (req,res)=>{
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
}
