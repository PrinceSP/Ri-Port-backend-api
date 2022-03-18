const nodemailer = require('nodemailer')

module.exports.generateOTP=()=>{
  let otp = ''
  for (let i = 0; i <=3; i++) {
    const randomOTP = Math.round(Math.random()*9)
    otp +=randomOTP
  }
  return otp
}

module.exports.mailTransport=()=>{
  const transporter = nodemailer.createTransport({
    // host:"smtp.gmail.com",
    service:"gmail",
    // port:465,
    // secure:true,
    auth:{
      user:process.env.MAILTRAP_USERNAME,
      pass:process.env.MAILTRAP_PASSWORD
    }
  })
  transporter.verify((error, success)=>{
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  return transporter
}
