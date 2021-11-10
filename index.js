const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 2000

app.use('/',(req,res)=>res.send('server is connected'))

app.listen(PORT,()=>console.log(`server and database has been connected to port:${PORT}`))
