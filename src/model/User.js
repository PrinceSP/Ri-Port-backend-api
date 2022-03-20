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
    fullname:{
      type:String,
      required:false,
      min: 8,
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
      required:false
    },
    phoneNumber:{
      type:String,
      unique:true,
      required:true
    },
    dateOfBirth:{
      type:String,
      required:false
    },
    verified:{
      type:Boolean,
      required:true,
      default:false,
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("User", User)
