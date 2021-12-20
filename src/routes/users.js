const router = require('express').Router()

router.get('/user',(req,res,next)=>{
  // res.status(200).json({
  // name:'prince'})
  res.send('hello user route')
  next()
})

module.exports = router
