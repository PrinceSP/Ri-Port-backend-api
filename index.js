const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require("morgan")
const helmet = require("helmet")
const bodyparser = require('body-parser')

//import routes
const {authRoute,userRoute,postRoute,feedbackRoute} = require('./src/routes')

dotenv.config()
const app = express()

//setting up the port
const PORT = process.env.PORT || 5000
//allows express to read the body and then parse that into a Json object
app.use(bodyparser.json())
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,UPDATE,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
})

//route middleware
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/feedback',feedbackRoute)

app.use(morgan('common'))
app.use(helmet())

app.use('/',(req,res)=>{
  res.status(200).send('server is connected. this is / endpoint')
})
//connnect to MongoDB database with mongoose library
//app listen to the port for localhost server
mongoose.connect(process.env.MONGO).then(()=>{
  app.listen(PORT,()=>console.log(`server and database has been connected to port:${PORT}`))
}).catch(e=>console.log(e))
