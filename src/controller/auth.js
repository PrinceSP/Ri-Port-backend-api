const User = require('../model/User')
const VerificationToken = require('../model/verifyToken')
const {generateOTP,mailTransport,emailTemplate} = require('../utils/mail')
const bcrypt = require('bcrypt')
const {isValidObjectId} = require('mongoose')

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
      ktpId: req.body.ktpId,
      phoneNumber: req.body.phoneNumber,
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

exports.verifyEmail = async(req,res)=>{
  try {
    const {userId,otp} = req.body
    if(!userId || !otp.trim()) res.send('invalid request, missing parameters')
    !isValidObjectId(userId) && res.send('invalid user id')

    const user = await User.findById(userId)
    !user && res.status(404).send('sorry, user not found!')

    user.email.verified===true && res.send('this account has been verified')

    const token = await VerificationToken.findOne({owner:user._id})
    !token && res.status(404).send('sorry, user not found!')

    const isMatched = await bcrypt.compare(otp,token.token)
    !isMatched && res.send('sorry, token is not the same')

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

    res.status(200).send(user)
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
    const newToken = new VerificationToken({
      owner:req.body.userId,
      token:OTP
    })

    // save token to database
    await newToken.save()

    client.messages.create({
      body: OTP,
      messagingServiceSid: 'MG608607e6c45639f1e76505ab7132030b',
      to: "+6281213507373"
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
    (!req.body.userId && !req.body.otp.trim()) && res.send('invalid request, missing parameters')
    !isValidObjectId(req.body.userId) && res.send('invalid user id')

    const user = await User.findById(req.body.userId)
    !user && res.status(404).send('sorry, user not found!')

    user.phoneNumber.verified===true && res.send('phone number is verified')

    const token = await VerificationToken.findOne({owner:user._id})
    !token && res.status(404).send('sorry, user not found!')

    const isMatched = await bcrypt.compare(req.body.otp,token.token)
    !isMatched && res.send('sorry, token is not the same')
    //
    user.phoneNumber.verified = true
    //
    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
}
