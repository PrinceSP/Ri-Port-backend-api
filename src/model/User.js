const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    username:{
      type:String,
      require:true,
      unique:true,
      min: 8,
      max: 25
    },
    email:{
      type:String,
      require:true,
      min: 8,
      max: 25,
      unique: true
    },
    password:{
      type:String,
      require:true,
      min: 6
    },
    address:{
      type:String,
      require:false
    },
    profilePicture:{
      type:String,
      default:""
    },
    ktpId:{
      type:String,
      unique:true,
      require:true
    },
    phoneNumber:{
      type:String,
      unique:true,
      require:true
    },
    dateOfBirth:{
      type:String,
      require:true
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("User", User)
