const User = require('../model/User')
const bcrypt = require('bcrypt')
const VerificationToken = require('../model/verifyToken')
const {generateOTP,mailTransport,emailTemplate} = require('../utils/mail')

exports.updateUser = async (req,res)=>{
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try{
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
        res.status(200).json('password has been updated')
      } catch(e){
        return res.status(500).json(e)
      }
    }

    if (req.body.userId === req.params.id) {
      if(req.body.email?.mail){
        const OTP=generateOTP()
        const newToken = new VerificationToken({
          owner:req.body.userId,
          token:OTP
        })
        await newToken.save()
        const mailOptions = {
          from:"RiPort <princedinda1228@gmail.com>",
          to:req.body.email.mail,
          subject:'Verify your email account',
          text: "There is a new article. It's about sending emails, check it out!",
          html:emailTemplate(OTP)
        }
        mailTransport().sendMail(mailOptions)
      }
    } else {
      return null
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
      res.status(500).json(e)
    }
  } else{
    res.status(403).json('you can only delete your account')
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
