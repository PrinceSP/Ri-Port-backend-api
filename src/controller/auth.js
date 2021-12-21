const User = require('../model/User')
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
      address: req.body.address,
      profilePicture: req.body.profilePicture,
      ktpId: req.body.ktpId,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
    })
    //save user to database
    const user =  await newUser.save()
    res.status(200).send(user)
  } catch (e) {
    console.log(e);
  }
}

exports.login = async (req,res)=>{
  try {
    //query to find only one of the user from database
    const user = await User.findOne({username:req.body.username})
    !user && res.status(404).json('user not found')
    //query to check if the user password is valid or not when user send POST request to login with this API
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('wrong password')
    //when there's nothing wrong, then send message
    res.status(200).json('success login')
  } catch (e) {
    res.status(500).json(`error: ${e}`);
  }
}
