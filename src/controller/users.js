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
      await User.deleteOne(req.params.id)
      res.status(200).json('account has been deleted')
    } catch (e) {
      return res.status(500).json(e)
    }
  } else{
    return res.status(403).json('you can only delete your account')
  }
}
