const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 2000

app.use('/',(req,res)=>res.send('localhost connected'))

app.listen(PORT,()=>console.log(`server connected to port:${PORT}`))
