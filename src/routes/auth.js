const router = require('express').Router()

//CREATE -> POST = post the informations when the user register their account
router.post('/register',(req,res,next)=>{
  res.json({
  name:'prince'})
})

//user login with their registered account
router.get('/login',(req,res,next)=>{
  res.json({
  name:'prince'})
})
module.exports = router
