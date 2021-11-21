const router = require('express').Router()

router.post('/register',(req,res)=>{
  res.send('hello this is register endpoint')
})

router.get('/login',(req,res)=>{
  res.send('hello this is login endpoint')
})
module.exports = router
