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
      from:"RiPort <princedinda1228@gmail.com>",
      to:newUser.email,
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

    user.verified && res.send('this account has been verified')

    const token = await VerificationToken.findOne({owner:user._id})
    !token && res.status(404).send('sorry, user not found!')

    // const isMatched = await token.compareToken(otp)
    const isMatched = await bcrypt.compare(otp,token.token)
    !isMatched && res.send('sorry, token is not the same')

    user.verified = true

    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    const mailOptions = {
      from:"RiPort <princedinda1228@gmail.com>",
      to:user.email,
      subject:'Welcome new user',
      text: "Email is verified!",
    }
    mailTransport().sendMail(mailOptions)

    res.status(200).send(user)
  } catch (e) {
    return e
  }
}

exports.verifyPhone = (req,res)=>{
  const accountSid = 'ACb0ce8ba45f1eac9ddd8d1f283d01c875';
  const authToken = 'ad8f26afa796737af8c2585091e46045';
  const client = require('twilio')(accountSid, authToken);
  const OTP=generateOTP()

  client.messages.create({
     body: OTP,
     messagingServiceSid: 'MG608607e6c45639f1e76505ab7132030b',
     to: req.body.phoneNumber
   })
  .then(message => console.log(message.sid))
  .done();
  res.status(201).send('success sent OTP')
}
