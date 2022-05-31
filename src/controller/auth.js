const User = require('../model/User')
const VerificationToken = require('../model/verifyToken')
const VerifyPhoneToken = require('../model/verifyPhoneToken')
const {generateOTP,mailTransport,emailTemplate} = require('../utils/mail')
const bcrypt = require('bcrypt')
const {isValidObjectId} = require('mongoose')

exports.register = async (req,res)=>{
  try {
    //create new user
    const newUser = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      email:  req.body.email,
      password: req.body.password,
      ktpId: req.body.ktpId,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
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
      from:"RiPort <princedinda1228@gmail.com>",
      to:newUser.email.mail,
      subject:'Verify your email account',
      text: "There is a new article. It's about sending emails, check it out!",
      html:emailTemplate(OTP)
    }
    mailTransport().sendMail(mailOptions)

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.login = async (req,res)=>{
  try {
    //query to find only one of the user from database
    const user = await User.findOne({username:req.body.username})
    //when user not found after query
    !user && res.status(404).send({message:'user not found'})
    //query to check if the user password is valid or not when user send POST request to login with this API
    const validPassword = await user.comparePassword(req.body.password)
    //when password is not the same with password stored in database or bad request
    !validPassword && res.status(400).send({message:'wrong password'})
    //when there's nothing wrong, then send message
    res.status(200).send({message:'success login', datas:user})
  } catch (e) {
    return e
  }
}

exports.verifyEmail = async(req,res)=>{
  try {
    const {userId,otp} = req.body
    if(!userId || !otp.trim()) res.send('invalid request, missing parameters')
    !isValidObjectId(userId) && res.send('invalid user id')

    const user = await User.findById(userId)
    !user && res.status(404).send('sorry, user not found!')
    user.email.verified===true && res.send({message:'this account has been verified'})

    const token = await VerificationToken.findOne({owner:user._id})
    !token && res.status(404).send({message:'sorry, user not found!'})

    const isMatched = await bcrypt.compare(otp,token.token)
    if(!isMatched) return res.status(404).send({message:'sorry, token is not the same'})

    if (isMatched === true) {
      user.email.verified = true
      await VerificationToken.findByIdAndDelete(token._id)
      await user.save()
      const mailOptions = {
        from:"RiPort <princedinda1228@gmail.com>",
        to:user.email.mail,
        subject:'Welcome new user',
        text: "Email is verified!",
      }
      mailTransport().sendMail(mailOptions)
    } else {
      user.email.verified = false
    }

    res.status(200).send('Email is verified!')
  } catch (e) {
    return e
  }
}

exports.smsOtpToPhone = async(req,res)=>{
  const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

  try {
    const user = await User.findById(req.body.userId)
    !user && res.status(404).send('sorry, user not found!')

    const OTP=generateOTP()
    const newToken = new VerifyPhoneToken({
      owner:req.body.userId,
      token:OTP
    })

    // save token to database
    await newToken.save()

    client.messages.create({
      body: OTP,
      messagingServiceSid: 'MG608607e6c45639f1e76505ab7132030b',
      to: req.body.phoneNumber
    })
    .then(message => console.log(message.sid))
    .done();

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.verifyPhoneNumber = async(req,res)=>{
  try {
    (!req.body.userId && !req.body.otp.trim()) && res.send({message:'invalid request, missing parameters'})
    !isValidObjectId(req.body.userId) && res.send({message:'invalid user id'})

    const user = await User.findById(req.body.userId)
    !user && res.status(404).send({message:'sorry, user not found!'})

    user.phoneNumber.verified === true && res.send({message:'phone number is already verified'})

    const token = await VerifyPhoneToken.findOne({owner:user._id})
    !token && res.status(404).send({message:'sorry, token not found!'})

    const isMatched = await bcrypt.compare(req.body.otp,token.token)
    !isMatched && res.send({message:'sorry, token is not the same'})

    if (isMatched===true) {
      user.phoneNumber.verified = true
      await VerifyPhoneToken.findByIdAndDelete(token._id)
      await user.save()
    } else {
      user.phoneNumber.verified = false
    }

    res.status(200).send({message:'Your phone number is verified'})
  } catch (e) {
    return e
  }
}
