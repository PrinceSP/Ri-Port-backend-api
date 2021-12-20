const router = require('express').Router()
const User = require('../model/User')

//CREATE -> POST = post the informations when the user register their account
router.post("/register", async (req,res)=>{
  const newUser = new User({
    username: req.body.username,
    email:  req.body.email,
    password: req.body.password,
    address: req.body.address,
    profilePicture: req.body.profilePicture,
    ktpId: req.body.ktpId,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
  })

  try {
    const user =  await newUser.save()
    res.status(200).send(user)
  } catch (e) {
    console.log(e);
  }
})

//user login with their registered account
router.get('/login',(req,res,next)=>{
  // res.status(200).json({
  // name:'prince'})
  res.send('hello login')
  next()
})
module.exports = router
