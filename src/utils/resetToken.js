const {isValidObjectId} = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../model/User')
const ResetPasswordToken = require('../model/resetToken')

exports.isResetTokenValid = async(req,res,next)=>{
  const {token, id} = req.query
  if(!token || !id) return res.status(500).send('Invalid request token and id')

  if(!isValidObjectId(id)) return res.status(500).send('Invalid request')

  const user = await User.findById(id)
  !user && res.status(404).send('User not found!')

  const resetToken = await ResetPasswordToken.findOne({owner:user._id})
  !resetToken && res.status(404).send('Reset token not found!')

  const isValid = await bcrypt.compare(token, resetToken.token)
  !isValid && res.send('Reset token is invalid')

  req.user = user
  next()
}
