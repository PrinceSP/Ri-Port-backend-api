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
      mail:{
        type:String,
        required:true,
        min: 8,
        max: 25,
        unique: true
      },
      verified:{
        type:Boolean,
        required:true,
        default:false,
      }
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
      number:{
        type:String,
        unique:true,
        required:true
      },
      verified:{
        type:Boolean,
        required:true,
        default:false
      }
    },
    dateOfBirth:{
      type:String,
      required:false
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("User", User)
