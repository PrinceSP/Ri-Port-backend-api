const User = require('../model/User')
const bcrypt = require('bcrypt')
const VerificationToken = require('../model/verifyToken')
const ResetPasswordToken = require('../model/resetToken')
const {createRandomBytes} = require('../utils/randomBytes')
const {generateOTP,mailTransport,emailTemplate,resetPasswordMailTemplate} = require('../utils/mail')

exports.updateUser = async (req,res)=>{
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try{
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
        res.status(200).json('password has been updated')
      } catch(e){
        return e
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
      return e
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

exports.forgotPassword = async (req,res)=>{
  try {
    const {username} = req.body
    !username && res.send('Please provide a valid username!')

    const user = await User.findOne({username})
    !user && res.status(404).send('User is not found!')

    const token = await ResetPasswordToken.findOne({owner: user._id})
    if(token) return res.send('Only one hour you can send again new token!')

    const randomBytes = await createRandomBytes()
    const resetToken = new ResetPasswordToken({owner:user._id,token:randomBytes})
    await resetToken.save()

    const mailOptions = {
      from:"RiPort Security <princedinda1228@gmail.com>",
      to:user.email.mail,
      subject:'Password Reset',
      text: "There is a new article. It's about sending emails, check it out!",
      html:resetPasswordMailTemplate(`https://riport.netlify.app/reset-password?token=${randomBytes}&id=${user._id}`)
    }

    mailTransport().sendMail(mailOptions)
    res.status(201).send({success:true,message:'Password reset link is sent to your email.'})
  } catch (e) {
    return e
  }
}


exports.resetPassword = async(req,res)=>{
  const {password} = req.body

  const user = await User.findById(req.user._id)
  if(!user) return res.status(404).send('User not found!')
  const isSamePassword = await bcrypt.compareSync(password,user.password)
  if(isSamePassword) return res.send('New password must be different!')

  if(password.trim().length < 8) return res.send('Password must be 8 characters or more!')

  user.password = password.trim()

  await user.save()

  await ResetPasswordToken.findOneAndDelete({owner:user._id})

  const mailOptions = {
    from:"RiPort Security <princedinda1228@gmail.com>",
    to:user.email.mail,
    subject:'Password Reset Successfully',
    html:resetPasswordMailTemplate(`Password reset successfully. Now you can login with new password!`)
  }

  mailTransport().sendMail(mailOptions)
  res.status(202).send({success:true,message:'Password Reset Successfully'})
}
