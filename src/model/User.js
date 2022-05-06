const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      min: 6,
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
      min: 8
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
    },
    role:{
      type:String,
      required:true,
      default:""
    }
  },
  {timestamps:true}
)

User.pre("save",async function(next){
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

  next()
})

module.exports = mongoose.model("User", User)
