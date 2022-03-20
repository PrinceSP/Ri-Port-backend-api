const nodemailer = require('nodemailer')
// const {google} = require('googleapis')
// const OAuth2 = google.auth.OAuth2

module.exports.generateOTP=()=>{
  let otp = ''
  for (let i = 0; i <=3; i++) {
    const randomOTP = Math.round(Math.random()*9)
    otp +=randomOTP
  }
  return otp
}

module.exports.mailTransport=()=>{
  // const oauth2Client = new OAuth2("727158547026-na08tu5e3emjirlflpc3suj24btjgsva.apps.googleusercontent.com",
  //   "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",
  //   "https://developers.google.com/oauthplayground"
  // )
  // oauth2Client.setCredentials({
  //   refresh_token: "1//04sbtqDeleW4QCgYIARAAGAQSNwF-L9IrONW7YtEnd0VVwpiV1_SIfiM7vGwmao7ZTxuK9t6sK5c8oDWh-8UTmbCTaHMzjVq86Ic"
  // });
  // const accessToken = oauth2Client.getAccessToken()
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    service:"gmail",
    // port: 587,
    // secure:false,
    auth: {
      // type:"OAuth2",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      // clientId: "727158547026-na08tu5e3emjirlflpc3suj24btjgsva.apps.googleusercontent.com",
      // clientSecret: "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",
      // refreshToken: "1//04sbtqDeleW4QCgYIARAAGAQSNwF-L9IrONW7YtEnd0VVwpiV1_SIfiM7vGwmao7ZTxuK9t6sK5c8oDWh-8UTmbCTaHMzjVq86Ic",
      // accessToken: accessToken
    },
    // tls: {
    //   rejectUnauthorized: false
    // }
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
