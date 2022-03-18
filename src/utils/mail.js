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
    host: "smtp.mailtrap.io",
    port: 2525,
    auth:{
      user:process.env.MAILTRAP_USERNAME,
      pass:process.env.MAILTRAP_PASSWORD
    }
  })
