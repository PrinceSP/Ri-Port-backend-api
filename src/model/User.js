const mongoose = require('mongoose')

consr UserSchema = new mongoose.Schema(
  {
    username:{
      type:String,
      require:true,
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
      require:true
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
      require:true
    },
    dateOfBirth:{
      type:String,
      require:true
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model('User',UserSchema)
