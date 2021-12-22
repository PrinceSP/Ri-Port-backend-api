const mongoose = require('mongoose')

const Post = new mongoose.Schema(
  {
    userId:{
      type:String,
      required:true
    },
    fullname:{
      type:String,
      // required:true,
      min:8
    },
    address:{
      type:String,
      // required:true
    },
    phoneNumber:{
      type:String,
      // required:true
    },
    ktpId:{
      type:String,
      // required:true
    },
    location:{
      latitude:{
        type:String,
        // required:true
      },
      longitude:{
        type:String,
        // required:true
      }
    },
    desc:{
      type:String,
      min:8,
      max:40
    },
    roadPicture:{
      type:String,
      // required:true
    }
  },
  {timestamps:true}
)

module.exports = mongoose.model("Post", Post)
