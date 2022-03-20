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
    service:"gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  transporter.verify((error,success)=>{
    if (error) {
      console.log(error);
    } else{
      console.log('ready for messages');
      console.log(success);
    }
  })
  return transporter
}
