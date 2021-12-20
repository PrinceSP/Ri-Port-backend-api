const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require("morgan")
const helmet = require("helmet")
//import routes
const authRoute= require('./src/routes/auth')
const userRoute= require('./src/routes/users')

dotenv.config()
const app = express()

//setting up the port
const PORT = process.env.PORT

//route middleware
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use(morgan('common'))
app.use(helmet())

app.use('/',(req,res,next)=>{
  res.send('server is connected. this is / endpoint')
  next()
})
//connnect to MongoDB database with mongoose library
//app listen to the port for localhost server
mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(PORT,()=>console.log(`server and database has been connected to port:${PORT}`))
})
