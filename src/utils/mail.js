const nodemailer = require('nodemailer')

module.exports.generateOTP=()=>{
  let otp = ''
  for (let i = 0; i <=3; i++) {
    const randomOTP = Math.round(Math.random()*9)
    otp +=randomOTP
  }
  return otp
}

module.exports.mailTransport=()=>nodemailer.createTransport({
    // host: "smtp.gmail.com",
    service:"gmail",
    // port: 2525,
    auth:{
      user:process.env.USERNAME,
      pass:process.env.PASSWORD
    }
  })
