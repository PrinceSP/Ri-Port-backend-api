const User = require('../model/User')
const VerificationToken = require('../model/verifyToken')
const {generateOTP,mailTransport} = require('../utils/mail')
const bcrypt = require('bcrypt')

exports.register = async (req,res)=>{
  try {
    //generate new password and encrypt it with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //create new user
    const newUser = new User({
      username: req.body.username,
      email:  req.body.email,
      password: hashedPassword,
      // address: req.body.address,
      // profilePicture: req.body.profilePicture,
      ktpId: req.body.ktpId,
      phoneNumber: req.body.phoneNumber,
      // dateOfBirth: req.body.dateOfBirth,
    })

    const OTP=generateOTP()
    const newToken = new VerificationToken({
      owner:newUser._id,
      token:OTP
    })

    // save user to database
    const user =  await newUser.save()
    await newToken.save()
    const mailOptions = {
      from:"princepasombaran@hotmail.com",
      to:newUser.email,
      subject:'Verify your email account',
      text: "There is a new article. It's about sending emails, check it out!",
      html:`<h1>${OTP}</h1>`
    }
    mailTransport().sendMail(mailOptions)

    res.status(200).send(user)
  } catch (e) {
    // console.log(e);
    return e
  }
}

exports.login = async (req,res)=>{
  try {
    //query to find only one of the user from database
    const user = await User.findOne({username:req.body.username})
    //when user not found after query
    !user && res.status(404).json('user not found')
    //query to check if the user password is valid or not when user send POST request to login with this API
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    //when password is not the same with password stored in database or bad request
    !validPassword && res.status(400).send({message:'wrong password'})
    //when there's nothing wrong, then send message
    res.status(200).send({message:'success login', datas:user})
  } catch (e) {
    return e
  }
}
//
module.exports.verifyByUsername = async(req,res)=>{
  try {
    const user = await User.findOne({username:req.body.username})
    !user && res.status(404).send('user not found')
    res.status(200).send({datas:user})
  } catch (e) {
    return e
  }
}
