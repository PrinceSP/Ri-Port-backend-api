const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//import routes
const authRoute= require('./src/routes/auth')

const app = express()
dotenv.config()

//setting up the port
const PORT = process.env.PORT || 2000

//route middleware
app.use('/api/user',authRoute)

app.use('/',(req,res,next)=>{
  res.send('server is connected. this is / endpoint')
  next()
})
//connnect to MongoDB database with mongoose library
//app listen to the port for localhost server
mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(PORT,()=>console.log(`server and database has been connected to port:${PORT}`))
})
