const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      min: 8,
      max: 25
    },
    email:{
      type:String,
      required:true,
      min: 8,
      max: 25,
      unique: true
    },
    password:{
      type:String,
      required:true,
      min: 6
    },
    address:{
      type:String,
      required:false
    },
    profilePicture:{
      type:String,
      default:""
    },
    ktpId:{
      type:String,
      unique:true,
      required:true
    },
    phoneNumber:{
      type:String,
      unique:true,
      required:true
    },
    dateOfBirth:{
      type:String,
      required:true
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("User", User)
