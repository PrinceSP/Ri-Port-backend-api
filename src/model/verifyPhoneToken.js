const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const VerifyPhoneToken = new mongoose.Schema({
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  token:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    expires:3600,
    default:Date.now()
  }
},{timestamps:true})

VerifyPhoneToken.pre('save',async function(next){
  if(this.isModified("token")){
    const hash = await bcrypt.hash(this.token,10)
    this.token = hash
  }
  next()
})

module.exports = mongoose.model("VerifyPhoneToken",VerifyPhoneToken)