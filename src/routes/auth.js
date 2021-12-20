const router = require('express').Router()

//CREATE -> POST = post the informations when the user register their account
router.post('/register',(req,res,next)=>{
  res.status(200).json({
  name:'prince'})
  next()
})

//user login with their registered account
router.get('/login',(req,res,next)=>{
  // res.status(200).json({
  // name:'prince'})
  res.send('hello login')
  next()
})
module.exports = router
