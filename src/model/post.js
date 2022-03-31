const mongoose = require('mongoose')

const Post = new mongoose.Schema(
  {
    userId:{
      type:String,
      required:true
    },
    fullname:{
      type:String,
      required:true,
      min:8
    },
    title:{
      type:String,
      required:false,
      min:6
    },
    address:{
      type:String,
      required:true
    },
    phoneNumber:{
      type:String,
      required:true
    },
    ktpId:{
      type:String,
      required:true
    },
    location:{
      latitude:{
        type:String,
        required:false,
        default:''
      },
      longitude:{
        type:String,
        required:false,
        default:''
      }
    },
    desc:{
      type:String,
      min:8,
      max:40
    },
    roadPicture:{
      type:String,
      required:true
    },
    status:{
      type:String,
      default:"Pending"
    },
    verified:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("Post", Post)
